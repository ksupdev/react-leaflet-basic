//rafce
import React, { useEffect } from 'react'
import Papa from 'papaparse';

const FirmNasa = ({ setFirm }) => {

    useEffect(() => {
        loadFirm();
    }, []);

    const loadFirm = async () => {
        const url = 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/1c029be6e7ca8699b9839bf7a168613d/VIIRS_SNPP_NRT/THA/1/2025-04-13'
        const response = await fetch(url);
        const text = await response.text();
        // Convert raw data to JSON
        const jsonData = Papa.parse(text, { header: true }).data;

        setFirm(jsonData);
    }


    return null;
}

export default FirmNasa
