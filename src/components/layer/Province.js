//rafce
import React from 'react'
import { GeoJSON } from 'react-leaflet';

import data from '../data/province.json'
import { feature } from '@turf/turf';

const Province = () => {

    const geoStyle = (feature) => {
        const region = feature.properties.REGION6;
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
        } else {
            return {
                weight: 1
            }
        }
    }

    const handleEachFeature = (feature, layer) => {
        // code
        console.log(feature.properties);
        layer.bindTooltip(feature.properties.ADM1_TH, {
            direction: 'right',
            // permanent: true
        });



    }

    return data && <GeoJSON
        data={data}
        style={geoStyle}
        onEachFeature={handleEachFeature}
    />;
}

export default Province
