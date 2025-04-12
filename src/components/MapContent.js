//rafce
import React, { useState, useRef } from 'react';
import { MapContainer, Marker, Tooltip, TileLayer, useMap } from 'react-leaflet';
import BaseMap from './layer/BaseMap';
import CSVFilelocal from './layer/CSVFilelocal';
import AircraftCSV from './layer/AircraftCSV';
import RouteAircraft from './layer/RouteAircraft';



import L from 'leaflet';
import 'leaflet-rotatedmarker';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconAir from 'leaflet/dist/images/air3.png';

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


L.Marker.prototype.options.icon = DefaultIcon;

const MapContent = () => {

    const mapRef = useRef();
    const [aircraft, setAircraft] = useState(null);


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
                <BaseMap />
                <CSVFilelocal />
                {aircraft && aircraft.map((item, index) =>
                    <Marker icon={airMarker} rotationAngle={item.bearing} key={index} position={[item.latitude, item.longitude]}>
                        <Tooltip>
                            angle: {item.angle}
                        </Tooltip>
                    </Marker>)}
                <RouteAircraft aircraft={aircraft} />
            </MapContainer>
        </div>
    )
}

export default MapContent
