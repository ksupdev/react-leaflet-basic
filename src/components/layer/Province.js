//rafce
import React from 'react'
import { GeoJSON } from 'react-leaflet';

import data from '../data/province.json'

const Province = () => {

    return data && <GeoJSON data={data} />;
}

export default Province
