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
import { containerStyle, heatmapData, mapaDefecto, Primaria, } from "@/data/mapaData";
import type { TRiesgo, IClienteResponse, IUbicacionCliente } from "@/models/ubicaciones.model";
import { darkMapStyles } from '../../data/mapaData';
import { FaMoon, FaSun } from "react-icons/fa6";

function MapaGoogle() {
  const mapRef = useRef() as any;

  const [center, setCenter] = useState({
    lat: 3.3345374,
    lng: -74.2701511,
  });
  const [zoomi, setZoomi] = useState(5);
  const [map, setMap] = useState<null | any>(null);
  const { ubicaciones, setUbicaciones } = useUbicaciones()
  const [ubicacionesShow, setUbicacionesShow] = useState<IUbicacionCliente[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<null | IUbicacionCliente>(null);
  const [theme, setTheme] = useState("light");
  const [clientes, setClientes] = useState<IClienteResponse[]>([
    {
      CLIE_ID_REG: "34",
      CLIE_COMERCIAL: "ALPINA"
    }
  ]);
  const [clienteSelected, setClienteSelected] = useState<null | IClienteResponse>(null);
  const [mapaCalor, setMapaCalor] = useState([]);
  const [riesgos, setRiesgos] = useState<TRiesgo[]>([]);
  const handleClienteChange = (cliente: IClienteResponse) => {
    if (clienteSelected?.CLIE_ID_REG === cliente.CLIE_ID_REG) {
      setClienteSelected(null);
      setUbicacionesShow(ubicaciones);
    } else {

      setClienteSelected(cliente);
      const ubicacionesFilter = ubicaciones.filter((ubicacion) => ubicacion.CLIUBIC_ID_CLIENTE === cliente.CLIE_ID_REG);
      setUbicacionesShow(ubicacionesFilter);
      console.log(cliente);
    }
  }

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setCenter({
      lat: Number.parseFloat(marker.Latitud),
      lng: Number.parseFloat(marker.Longitud),
    });
    // setZoomi(7);
  };

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const getData = async () => {
    const response = await UbicacionesClientes();
    console.log(response);
    setUbicaciones(response.data);
    setUbicacionesShow(response.data);
    const responseClient = await getClients()
    console.log(responseClient);
    let clientes = []
    if (responseClient.data.data.find((cliente: any) => cliente.CLIE_ID_REG === "34")) {
      clientes = responseClient.data.data
    } else {
      clientes = [{
        CLIE_ID_REG: "34",
        CLIE_COMERCIAL: "ALPINA"
      }, ...responseClient.data.data]
    }
    setClientes(clientes);
  }

  const getMapaCalor = new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(heatmapData);

      }, 100);
    } catch (error) {
      reject(error)
    }
  });
  useEffect(() => {
    if (map) {
      map.setZoom(zoomi);
    }
    if (ubicaciones.length === 0) {
      getData();
    }
    getMapaCalor.then((data: any) => {
      setMapaCalor(data);
    });
  }, []);

  useEffect(() => { }, [ubicaciones, zoomi])

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
        cliente={clienteSelected}
        setCliente={handleClienteChange}
        setRiesgosShow={setRiesgos}
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
            setZoomi(newZoom);
          }
        }}
        options={{
          styles: theme === "light" ? mapaDefecto : darkMapStyles,
          //darkMapStyles       mapaDefecto
          // disableDefaultUI: true,
          zoomControl: true,
          minZoom: 6,
          // maxZoom: 8,
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
            ubicacionesShow.map((coordenada, index) => (
              <div className="icono">
                <Marker
                  key={index}
                  position={{
                    lat: Number.parseFloat(coordenada.CLIUBIC_LATITUD),
                    lng: Number.parseFloat(coordenada.CLIUBIC_LONGITUD),
                  }}
                  onMouseOver={() => handleMarkerClick(coordenada)}
                  onMouseOut={() => setSelectedMarker(null)}
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

          {riesgos.length > 0 && mapaCalor.map((coordenada: any, index) => (
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
      <div className="theme">
        {theme === "light" ? (
          <button className="dark" onClick={() => setTheme("dark")}>
            <FaMoon />
          </button>
        ) : (
          <button className="light" onClick={() => setTheme("light")}>
            <FaSun />
          </button>
        )}
      </div>
      <IndicadorFiltro />


    </>
  ) : (
    <></>
  );
}
const MapaGoogleComponent = React.memo(MapaGoogle);
export default MapaGoogleComponent 
