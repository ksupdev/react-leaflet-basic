//rafce
import React, { useState, useRef } from 'react';
import {
    MapContainer,
    Marker,
    Tooltip,
    TileLayer,
    useMap,
    LayersControl,
    LayerGroup,
} from 'react-leaflet';
import BaseMap from './layer/BaseMap';
import CSVFilelocal from './layer/CSVFilelocal';
import AircraftCSV from './layer/AircraftCSV';
import RouteAircraft from './layer/RouteAircraft';
import Province from './layer/Province';
import FirmNasa from './layer/FirmNasa';



import L from 'leaflet';
import 'leaflet-rotatedmarker';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconAir from 'leaflet/dist/images/air3.png';
import iconFirm from 'leaflet/dist/images/fire.gif';

import './map.css';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5]
});

let airMarker = L.icon({
    iconUrl: iconAir,
    shadowUrl: iconShadow,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

let firmMarker = L.icon({
    iconUrl: iconFirm,
    shadowUrl: iconShadow,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});


L.Marker.prototype.options.icon = DefaultIcon;

const MapContent = () => {
    const isShowFirmData = false;

    const mapRef = useRef();
    const [aircraft, setAircraft] = useState(null);
    const [firm, setFirm] = useState(null);


    function focusTo(objects) {
        const bounds = objects.reduce(
            function (acc, cur) {
                return acc.extend([cur.latitude, cur.longitude]);
            },
            L.latLngBounds()
        );
        mapRef.current.fitBounds(bounds);
    }


    // console.log('Hello', aircraft);

    return (
        <div>

            <AircraftCSV setAircraft={setAircraft} focusTo={focusTo} />
            <MapContainer
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100vh'
                }}
                center={[13, 100]}
                zoom={6}
                scrollWheelZoom={true}>
                <TileLayer max
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl>
                    <BaseMap />

                    <LayersControl.Overlay name='Airport'>
                        <LayerGroup>
                            <CSVFilelocal />
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Aircraft'>
                        <LayerGroup>
                            {aircraft && aircraft.map((item, index) =>
                                <Marker icon={airMarker} rotationAngle={item.bearing} key={index} position={[item.latitude, item.longitude]}>
                                    <Tooltip>
                                        angle: {item.angle}
                                    </Tooltip>
                                </Marker>)}

                            <RouteAircraft aircraft={aircraft} />
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Firm'>
                        <LayerGroup>
                            {(isShowFirmData === true) && (
                                <>
                                    <FirmNasa setFirm={setFirm} />
                                    {firm && firm.map((item, index) =>
                                        <Marker icon={firmMarker} rotationAngle={item.bearing} key={index} position={[item.latitude, item.longitude]}>
                                            <Tooltip>
                                                {
                                                    Object.keys(item).map(key =>
                                                        <div>
                                                            <b>{key}</b>: {item[key]}
                                                        </div>
                                                    )
                                                }

                                            </Tooltip>
                                        </Marker>)}
                                </>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Province'>
                        <LayerGroup>
                            <Province />
                        </LayerGroup>
                    </LayersControl.Overlay>

                </LayersControl>
            </MapContainer>
        </div>
    )
}

export default MapContent
