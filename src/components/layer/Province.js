//rafce
import React from 'react'
import { GeoJSON } from 'react-leaflet';

import data from '../data/province.json'

const Province = () => {

    const geoStyle = (feature) => {
        const region = feature.properties.REGION6;
        console.log(region);
        if (region == 'ภาคกลาง') {
            return {
                weight: 1,
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.3
            }
        } else if (region == 'ภาคตะวันออกเฉียงเหนือ') {
            return {
                weight: 1,
                color: 'green',
                fillColor: 'green',
                fillOpacity: 0.3
            }
        } else if (region == 'ภาคเหนือ') {
            return {
                weight: 1,
                color: 'yellow',
                fillColor: 'yellow',
                fillOpacity: 0.3
            }
        } else{
            return {
                weight: 1
            }
        }
    }

    return data && <GeoJSON data={data}
        style={geoStyle}
    />;
}

export default Province
