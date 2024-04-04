import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import EtiquetaLateralLogoCli from "@components/EtiquetaLateralCliente/EtiquetaLateralLogoCli";
import LateralFiltroMapa from "@components/LateralFiltroMapa/LateralFiltroMapa";
import "./stylesMapa.css";
import IndicadorFiltro from "@components/IndicadoresFiltro/IndicadorFiltro";
import Notificaciones from "@components/Notificaciones/Notificaciones";

import ZonaCalor from "@assets/img/MapaIconos/CIRCULO-RIESGOS.gif";

import { VITE_GOOGLE_MAPS_API_KEY } from "@/config";
import { getClients, UbicacionesClientes } from "@/api/conexiones.api";
import { useUbicaciones } from "@/states/Ubicaciones.state";
import { containerStyle, Finca, FincaVIP, heatmapData, mapaDefecto, Mobile, Primaria, Secundaria, Ticket } from "@/data/mapaData";
import type { IClienteResponse, IUbicacionCliente } from "@/models/ubicaciones.model";
import { darkMapStyles } from '../../data/mapaData';

function MapaGoogle() {
  const [center, setCenter] = useState({
    lat: 3.3345374,
    lng: -74.2701511,
  });
  const [zoomi, setZoomi] = useState(5);
  const [map, setMap] = useState<null | any>(null);
  const { ubicaciones, setUbicaciones } = useUbicaciones()
  const mapRef = useRef() as any;
  const [selectedMarker, setSelectedMarker] = useState<null | IUbicacionCliente>(null);
  const [clientes, setClientes] = useState<IClienteResponse[]>([
    {
      CLIE_ID_REG: "34",
      CLIE_COMERCIAL: "ALPINA"
    }
  ]);
  const [clienteSelected, setClienteSelected] = useState<null | IClienteResponse>(null);

  const handleClienteChange = (cliente: IClienteResponse) => {
    setClienteSelected(cliente);
    const ubicacionesFilter = ubicaciones.filter((ubicacion) => ubicacion.CLIUBIC_ID_CLIENTE === cliente.CLIE_ID_REG);
    setUbicaciones(ubicacionesFilter);
    console.log(cliente);
  }

  const handleMarkerClick = (marker: any) => {
    console.log(marker);
    setSelectedMarker(marker);
    setCenter({
      lat: Number.parseFloat(marker.Latitud),
      lng: Number.parseFloat(marker.Longitud),
    });
    setZoomi(7);
  };

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const getData = async () => {
    const response = await UbicacionesClientes();
    console.log(response);
    setUbicaciones(response.data);
    const responseClient = await getClients()
    console.log(responseClient);
    const clientes = [{
      CLIE_ID_REG: "34",
      CLIE_COMERCIAL: "ALPINA"
    }, ...responseClient.data.data]
    setClientes(clientes);
  }

  useEffect(() => {
    if (map) {
      map.setZoom(zoomi);
    }
    getData();
  }, []);

  useEffect(() => { }, [ubicaciones])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });


  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);


  return isLoaded ? (
    <>
      <Notificaciones />
      <LateralFiltroMapa
        clientes={clientes}
        setCliente={handleClienteChange}
      />
      <EtiquetaLateralLogoCli cliente={clienteSelected} />
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={center}
        onUnmount={onUnmount}
        zoom={zoomi}
        onZoomChanged={() => {
          if (mapRef.current) {
            const newZoom = mapRef.current.getZoom();
            if (newZoom !== zoomi) {
              setZoomi(newZoom);
            }
          }
        }}
        options={{
          styles: darkMapStyles,
          //darkMapStyles       mapaDefecto
          disableDefaultUI: true,
          zoomControl: true,
          minZoom: 6,
          maxZoom: 8,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER, // Cambia la posición del control de zoom (TOP_LEFT, TOP_CENTER, TOP_RIGHT, LEFT_CENTER, RIGHT_CENTER, BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT)
          },
        }}
      >
        <div>
          {/* <MarkerClusterer
            gridSize={50} 
            averageCenter 
          > */}
          {/* {(clusterer) => */}
          {
            ubicaciones.map((coordenada, index) => (
              <div className="icono">
                <Marker
                  key={index}
                  position={{
                    lat: Number.parseFloat(coordenada.CLIUBIC_LATITUD),
                    lng: Number.parseFloat(coordenada.CLIUBIC_LONGITUD),
                  }}
                  onClick={() => handleMarkerClick(coordenada)}
                  // clusterer={clusterer}
                  icon={
                    Primaria
                  }
                // icon={
                //   coordenada.TipoIcono == "1"
                //     ? Primaria
                //     : coordenada.TipoIcono == "2"
                //       ? Secundaria
                //       : coordenada.TipoIcono == "3"
                //         ? Mobile
                //         : coordenada.TipoIcono == "4"
                //           ? Finca
                //           : coordenada.TipoIcono == "5"
                //             ? FincaVIP
                //             : coordenada.TiempoFinal >= coordenada.hora_actual
                //               ? Ticket[0]
                //               : Ticket[1]
                // }
                >
                </Marker>
              </div>
            ))}

          {heatmapData.map((coordenada, index) => (
            <Marker
              key={index}
              position={{
                lat: Number.parseFloat(`${coordenada.latitude}`),
                lng: Number.parseFloat(`${coordenada.longitude}`),
              }}
              icon={{
                url: ZonaCalor,
                scaledSize: new window.google.maps.Size(
                  (coordenada.intensity / 10) * zoomi,
                  (coordenada.intensity / 10) * zoomi
                ),
                anchor: new window.google.maps.Point(
                  ((coordenada.intensity / 10) * zoomi) / 2,
                  ((coordenada.intensity / 10) * zoomi) / 2
                ),
                labelOrigin: new window.google.maps.Point(
                  ((coordenada.intensity / 10) * zoomi) / 2,
                  ((coordenada.intensity / 10) * zoomi) / 2
                ),
                //style: { filter: `blur(${zoomi}px)` },
              }}
            />
          ))}
          {selectedMarker && (
            <>
              <InfoWindow
                position={{
                  lat: Number.parseFloat(selectedMarker.CLIUBIC_LATITUD),
                  lng: Number.parseFloat(selectedMarker.CLIUBIC_LONGITUD),
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="mapPopover" >
                  <p>Ciente: <span>{selectedMarker.client.CLIE_COMERCIAL}</span></p>
                  <p>Nombre: <span>{selectedMarker.CLIUBIC_NOMBRE}</span> </p>
                  <p>Direccion: <span>{selectedMarker.CLIUBIC_DIRECCION}</span> </p>

                  <p>Latitud: <span>{selectedMarker.CLIUBIC_LATITUD}</span> </p>
                  <p>Longitud: <span>{selectedMarker.CLIUBIC_LONGITUD}</span> </p>
                </div>
              </InfoWindow>
            </>
          )}
        </div>
      </GoogleMap>
      <IndicadorFiltro />
      {/*       <ContenedorTickets
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        center={center}
        setCenter={setCenter}
      /> */}
    </>
  ) : (
    <></>
  );
}
const MapaGoogleComponent = React.memo(MapaGoogle);
export default MapaGoogleComponent 
