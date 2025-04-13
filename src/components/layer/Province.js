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

    const handleClickFeature = (event) => {

        const layer = event.target;
        const prop = event.target.feature.properties;

        let popupContent = '';
        for (const [key, val] of Object.entries(prop)) {

            let testImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_AC2Gj_By0e3bZmq2V_jWIqyPM9oJ2DaUQ&s';
            if (key == 'REGION6') {
                popupContent += "<img style='max-width:100%' src ='" + testImage + "' />";
            } else {
                popupContent += key + ': ' + val + '<br/>';
            }

        }

        layer.bindPopup(popupContent);
    }

    const handleEachFeature = (feature, layer) => {
        // code
        // console.log(feature.properties);
        layer.bindTooltip(feature.properties.ADM1_TH, {
            direction: 'right',
            // permanent: true
        });
        layer.on({
            'click': handleClickFeature
        });



    }

    return data && <GeoJSON
        data={data}
        style={geoStyle}
        onEachFeature={handleEachFeature}
    />;
}

export default Province
