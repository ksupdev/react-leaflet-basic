//rafce

import React, { useState } from 'react'
import Papa from 'papaparse';


const AircraftCSV = ({ setAircraft }) => {
    const [data, setData] = useState(null);

    function groupKey(data) {
        const groupedData = Object.values(data).reduce(function (acc, cur) {
            const groupKey = cur.callsign; // Group by ...
            acc[groupKey] = acc[groupKey] || [];
            acc[groupKey].push(cur);
            return acc;
        }, {});
        return groupedData
    }

    const handleSelectFile = (event) => {
        //console.log(event.target.files[0]);
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true, complete: (results) => {

                const filterData = results.data
                    .filter((item) => (
                        item.latitude !== null
                        && item.latitude !== undefined
                        && item.latitude !== '')
                        && (
                            item.longitude !== null
                            && item.longitude !== undefined
                            && item.longitude !== ''));


                const groupData = groupKey(filterData);
                setData(groupData);


            }
        });
    }

    const handleSelect = (event) => {
        // console.log(event.target.value);
        const callSign = event.target.value;
        //console.log(data[callSign]);

        setAircraft(data[callSign]);

    }

    // console.log(data);
    return (
        <>
            <input type={'file'} onChange={handleSelectFile} />
            <select onChange={handleSelect}>
                {data && Object.keys(data).map((item, index) =>
                    <option key={index} value={item}>
                        {item}
                    </option>
                )}
            </select>
        </>
    )
}

export default AircraftCSV
