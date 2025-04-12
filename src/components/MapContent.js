//rafce
import React, { useState, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import BaseMap from './layer/BaseMap'
import CSVFilelocal from './layer/CSVFilelocal'
import AircraftCSV from './layer/AircraftCSV'

import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 20.5]
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
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <BaseMap />
                <CSVFilelocal />
                {aircraft && aircraft.map((item, index) => <Marker key={index} position={[item.latitude, item.longitude]}></Marker>)}
            </MapContainer>
        </div>
    )
}

export default MapContent
