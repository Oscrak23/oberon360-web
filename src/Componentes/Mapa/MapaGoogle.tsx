import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
  HeatmapLayer,
} from "@react-google-maps/api";
import EtiquetaLateralLogoCli from "../EtiquetaLateralCliente/EtiquetaLateralLogoCli";
import LateralFiltroMapa from "../LateralFiltroMapa/LateralFiltroMapa";
import "./stylesMapa.css";
import IndicadorFiltro from "../IndicadoresFiltro/IndicadorFiltro";
import ContenedorTickets from "../ContenedorTicket/ContenedorTickets";
import Notificaciones from "../Notificaciones/Notificaciones";

import BodegaAmarillo from "../../assets/img/MapaIconos/BODEGA-AMARILLO.png";
import BodegaAzul from "../../assets/img/MapaIconos/BODEGA-AZUL.png";
import BodegaRojo from "../../assets/img/MapaIconos/BODEGA-ROJO.png";
import BodegaVerde from "../../assets/img/MapaIconos/BODEGA-VERDE.png";
import Bodega from "../../assets/img/MapaIconos/BODEGA-SIN-COLOR.png";

// import FincaAmarillo from '../../assets/img/MapaIconos/FINCA-AMARILLO.png'
import FincaAzul from "../../assets/img/MapaIconos/FINCA-AZUL.png";
import FincaRojo from "../../assets/img/MapaIconos/FINCA-ROJA.png";
import FincaVerde from "../../assets/img/MapaIconos/FINCA-VERDE.png";
import Finca from "../../assets/img/MapaIconos/FINCA-SIN-COLOR.png";

import FincaVIPAmarillo from "../../assets/img/MapaIconos/FINCA-VIP-AMARILLO.png";
import FincaVIPAzul from "../../assets/img/MapaIconos/FINCA-VIP-AZUL.png";
import FincaVIPRojo from "../../assets/img/MapaIconos/FINCA-VIP-ROJO.png";
import FincaVIPVerde from "../../assets/img/MapaIconos/FINCA-VIP-VERDE.png";
import FincaVIP from "../../assets/img/MapaIconos/FINCA-VIP-SIN-COLOR.png";

import FlotaPrimariaAmarillo from "../../assets/img/MapaIconos/FLOTA-PRIMARIA-AMARILLO.png";
import FlotaPrimariaAzul from "../../assets/img/MapaIconos/FLOTA-PRIMARIA-AZUL.png";
import FlotaPrimariaRojo from "../../assets/img/MapaIconos/FLOTA-PRIMARIA-ROJO.png";
import FlotaPrimariaVerde from "../../assets/img/MapaIconos/FLOTA-PRIMARIA-VERDE.png";
// import FlotaPrimaria from '../../assets/img/MapaIconos/FLOTA-PRIMARIA-SIN-COLOR.png'

import FlotaSecundariaAmarillo from "../../assets/img/MapaIconos/FLOTA-SECUNDARIA-AMARILLO.png";
import FlotaSecundariaAzul from "../../assets/img/MapaIconos/FLOTA-SECUNDARIA-AZUL.png";
import FlotaSecundariaRojo from "../../assets/img/MapaIconos/FLOTA-SECUNDARIA-ROJO.png";
import FlotaSecundariaVerde from "../../assets/img/MapaIconos/FLOTA-SECUNDARIA-VERDE.png";
// import FlotaSecundaria from '../../assets/img/MapaIconos/FLOTA-SECUNDARIA-SIN-COLOR.png'

import MobileAmarillo from "../../assets/img/MapaIconos/MOBILE-AMARILLO.png";
import MobileAzul from "../../assets/img/MapaIconos/MOBILE-AZUL.png";
import MobileRojo from "../../assets/img/MapaIconos/MOBILE-ROJO.png";
import MobileVerde from "../../assets/img/MapaIconos/MOBILE-VERDE.png";
// import Mobile from '../../assets/img/MapaIconos/MOBILE-SIN-COLOR.png'

import TicketAmarillo from "../../assets/img/MapaIconos/DAVIVIENDA-AMARILLO.png";
import TicketAzul from "../../assets/img/MapaIconos/DAVIVIENDA-AZUL.png";
import TicketRojo from "../../assets/img/MapaIconos/DAVIVIENDA-ROJO.png";
import TicketVerde from "../../assets/img/MapaIconos/DAVIVIENDA-VERDE.png";
// import Ticket from '../../assets/img/MapaIconos/DAVIVIENDA-SIN-COLOR.png'

import ZonaCalor from "../../assets/img/MapaIconos/CIRCULO-RIESGOS.gif";

///SideBar
import Sidebar from "../Sidebar/SideBar";
import { LoginContext } from "../../context/LoginProvider";
import { useConections } from "../../context/conexionesprovider";

const heatmapData = [
  { latitude: 4.657, longitude: -74.047, intensity: 97 },
  { latitude: 3.44, longitude: -76.5197, intensity: 61 },
  { latitude: 6.2447, longitude: -75.5748, intensity: 35 },
  { latitude: 10.9833, longitude: -74.8019, intensity: 22 },
  { latitude: 10.4236, longitude: -75.5253, intensity: 20 },
  { latitude: 8.76, longitude: -75.8856, intensity: 20 },
  { latitude: 11.2361, longitude: -74.2017, intensity: 19 },
  { latitude: 4.1425, longitude: -73.6294, intensity: 16 },
  { latitude: 4.4378, longitude: -75.2006, intensity: 15 },
  { latitude: 4.8143, longitude: -75.6946, intensity: 15 },
  { latitude: 7.9075, longitude: -72.5047, intensity: 13 },
  { latitude: 1.21, longitude: -77.2747, intensity: 13 },
  { latitude: 10.4603, longitude: -73.2597, intensity: 13 },
  { latitude: 2.9275, longitude: -75.2875, intensity: 11 },
  { latitude: 4.5389, longitude: -75.6725, intensity: 10 },
  { latitude: 9.2994, longitude: -75.3958, intensity: 10 },
  { latitude: 7.1186, longitude: -73.1161, intensity: 9 },
  { latitude: 11.5442, longitude: -72.9069, intensity: 9 },
  { latitude: 5.0661, longitude: -75.4847, intensity: 8 },
  { latitude: 2.4542, longitude: -76.6092, intensity: 8 },
  { latitude: 1.6142, longitude: -75.6117, intensity: 7 },
  { latitude: 5.3306, longitude: -72.3906, intensity: 6 },
  { latitude: 5.5403, longitude: -73.3614, intensity: 5 },
  { latitude: 5.6923, longitude: -76.6582, intensity: 3 },
  { latitude: 12.5847, longitude: -81.7006, intensity: 2 },
  { latitude: 2.5653, longitude: -72.6386, intensity: 2 },
  { latitude: 7.0903, longitude: -70.7617, intensity: 1 },
  { latitude: 1.1492, longitude: -76.6464, intensity: 1 },
  { latitude: 6.1903, longitude: -67.4837, intensity: 1 },
  { latitude: 3.8708, longitude: -67.9211, intensity: 0 },
  { latitude: 4.9081, longitude: -73.9403, intensity: 0 },
];

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MapaGoogle() {
  const [center, setCenter] = useState({
    lat: 3.3345374,
    lng: -74.2701511,
  });

  const [zoomi, setZoomi] = useState(5);
  const [map, setMap] = useState<null | any>(null);
  const { ubicaciones, getUbicaciones } = useConections() as any;
  const mapRef = useRef() as any;
  const { user } = useContext(LoginContext) as any;

  const [selectedMarker, setSelectedMarker] = useState<any>({});

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setCenter({
      lat: parseFloat(marker.Latitud),
      lng: parseFloat(marker.Longitud),
    });
    setZoomi(7);
  };
  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMap(map);
  }, []);
  useEffect(() => {
    if (map) {
      map.setZoom(zoomi);
    }
    getUbicaciones();
  }, [getUbicaciones, ubicaciones, map, zoomi]);

  const [mostrarVehiculos, setMostrarVehiculos] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCY_qJm1wsuvs4UKuxU_cGKV0j2gHl0KeI",
  });

  const [filtro, setFiltro] = useState(true);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const handleZoomChanged = () => {
    const newZoom = mapRef.current.getZoom();
    setZoomi(newZoom);
  };

  const colombiaBounds = {
    north: 13.509,
    south: -4.227,
    west: -78.99,
    east: -66.869,
  };
  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e6e6e6" }], // lineas de pais
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }], // calles
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }], // contorno calle
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }], //texto de las calles
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#00e7ff" }], // vias principales
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#071328" }], // agua mar
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  const OberonStaly = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#071328" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#E6E6E6" }], //1a617a
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#071328" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  const blueGreenMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#005a71" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#005a71" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
  ];

  const mapaDefecto: any[] = [];

  const Primaria = {
    url: FlotaPrimariaVerde,
  };
  const Secundaria = {
    url: FlotaSecundariaVerde,
  };

  const Mobile = {
    url: MobileVerde,
  };

  const Finca = {
    url: FincaVerde,
  };

  const FincaVIP = {
    url: FincaVIPVerde,
  };

  const Ticket = [
    {
      url: TicketVerde,
    },
    {
      url: TicketRojo,
    },
  ];

  const ZonaRoja = {
    url: ZonaCalor,
  };

  {
    filtro &&
      ubicaciones.map((coordenada: any) => (
        <Marker
          key={coordenada.ID}
          position={{
            lat: parseFloat(coordenada.Latitud),
            lng: parseFloat(coordenada.Longitud),
          }}
          onClick={() => handleMarkerClick(coordenada)}
          // clusterer={clusterer}
          icon={
            coordenada.TipoIcono == "1"
              ? Primaria
              : coordenada.TipoIcono == "2"
              ? Secundaria
              : coordenada.TipoIcono == "3"
              ? Mobile
              : coordenada.TipoIcono == "4"
              ? Finca
              : coordenada.TipoIcono == "5"
              ? FincaVIP
              : coordenada.TiempoFinal >= coordenada.hora_actual
              ? Ticket[0]
              : Ticket[1]
          }
        />
      ));
  }

  const defoultMap = [];

  return isLoaded ? (
    <>
      <Notificaciones />
      <div>usuario:{user}</div>
      <LateralFiltroMapa
        mostrarVehiculos={mostrarVehiculos}
        setMostrarVehiculos={setMostrarVehiculos}
      />
      <EtiquetaLateralLogoCli />
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
          styles: mapaDefecto, //darkMapStyles       mapaDefecto
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
          {mostrarVehiculos &&
            ubicaciones.map((coordenada: any) => (
              <Marker
                key={coordenada.ID}
                position={{
                  lat: parseFloat(coordenada.Latitud),
                  lng: parseFloat(coordenada.Longitud),
                }}
                onClick={() => handleMarkerClick(coordenada)}
                // clusterer={clusterer}
                icon={
                  coordenada.TipoIcono == "1"
                    ? Primaria
                    : coordenada.TipoIcono == "2"
                    ? Secundaria
                    : coordenada.TipoIcono == "3"
                    ? Mobile
                    : coordenada.TipoIcono == "4"
                    ? Finca
                    : coordenada.TipoIcono == "5"
                    ? FincaVIP
                    : coordenada.TiempoFinal >= coordenada.hora_actual
                    ? Ticket[0]
                    : Ticket[1]
                }
              />
            ))}
          {/* </MarkerClusterer> */}

          {true &&
            heatmapData.map((coordenada: any, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(coordenada.latitude),
                  lng: parseFloat(coordenada.longitude),
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
            <InfoWindow
              position={{
                lat: parseFloat(selectedMarker.Latitud),
                lng: parseFloat(selectedMarker.Longitud),
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>Coordenadas:</h3>
                <p>Detalle: {selectedMarker.Detalle} </p>
                <p>
                  A tiempo:{" "}
                  {selectedMarker.TiempoFinal >= selectedMarker.hora_actual
                    ? "Sí"
                    : "No"}{" "}
                </p>
                <p>Latitud: {selectedMarker.Latitud}</p>
                <p>Longitud: {selectedMarker.Longitud}</p>
                <p>Hora programada: {selectedMarker.TiempoFinal}</p>
              </div>
            </InfoWindow>
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

export default React.memo(MapaGoogle);
