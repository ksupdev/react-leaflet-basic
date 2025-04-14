//rafce
import React from 'react';
import { Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

const FormData = ({ setData, data, DefaultIcon }) => {

    let clickMarker = data.icon ? L.icon({
        iconUrl: data.icon,
        iconSize: [data.size, data.size],
        iconAnchor: [data.size / 2, data.size / 2]
    }) : DefaultIcon;

    const map = useMapEvent({
        click(e) {
            map.flyTo(e.latlng);

            // ...prevState Command for copy old data
            setData((prevState) => ({
                ...prevState,
                latitude: e.latlng.lat,
                longitude: e.latlng.lng,
            }));
        }
    });
    // console.log('Data FromData component', data);
    return data.latitude
        && data.longitude
        && <Marker icon={clickMarker} position={[data.latitude, data.longitude]}></Marker>;
}

export default FormData
