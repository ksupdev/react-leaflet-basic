//rafce
import React from 'react'
import { Polyline } from 'react-leaflet'

const RouteAircraft = ({ aircraft }) => {

    const position = aircraft && aircraft.map((item) => [item.latitude, item.longitude])
    // console.log('line', position);



    return aircraft && <Polyline pathOptions={{ color: 'red', weight: '3' }} positions={position} />;
}

export default RouteAircraft
