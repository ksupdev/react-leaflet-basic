//rafce
import React, { useState, useRef } from 'react';
import {
    MapContainer,
    Marker,
    Tooltip,
    TileLayer,
    useMap,
    LayersControl,
    LayerGroup,
} from 'react-leaflet';
import BaseMap from './layer/BaseMap';
import CSVFilelocal from './layer/CSVFilelocal';
import AircraftCSV from './layer/AircraftCSV';
import RouteAircraft from './layer/RouteAircraft';
import Province from './layer/Province';
import FirmNasa from './layer/FirmNasa';
import FormData from './layer/FormData';



import L from 'leaflet';
import 'leaflet-rotatedmarker';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconAir from 'leaflet/dist/images/air3.png';
import iconFirm from 'leaflet/dist/images/fire.gif';

import './map.css';
import { center } from '@turf/turf';


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

let firmMarker = L.icon({
    iconUrl: iconFirm,
    shadowUrl: iconShadow,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});


L.Marker.prototype.options.icon = DefaultIcon;

const MapContent = () => {
    const isShowFirmData = false;

    const mapRef = useRef();
    const [aircraft, setAircraft] = useState(null);
    const [firm, setFirm] = useState(null);
    const [data, setData] = useState({
        title: '',
        latitude: '',
        longitude: '',
        icon: '',
        size: ''

    })

    function focusTo(objects) {
        const bounds = objects.reduce(
            function (acc, cur) {
                return acc.extend([cur.latitude, cur.longitude]);
            },
            L.latLngBounds()
        );
        mapRef.current.fitBounds(bounds);
    }

    const onChangeData = (e) => {
        console.log(e.target.name, e.target.value);
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
    }

    return (
        <div>
            <AircraftCSV setAircraft={setAircraft} focusTo={focusTo} />
            <div className='grid grid-cols-3 gap-4'>
                <div className="col-span-2 ...">
                    <MapContainer
                        ref={mapRef}
                        style={{
                            margin: '10px',
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
                        <LayersControl>
                            <BaseMap />

                            <LayersControl.Overlay name='Airport'>
                                <LayerGroup>
                                    <CSVFilelocal />
                                </LayerGroup>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name='Aircraft'>
                                <LayerGroup>
                                    {aircraft && aircraft.map((item, index) =>
                                        <Marker icon={airMarker} rotationAngle={item.bearing} key={index} position={[item.latitude, item.longitude]}>
                                            <Tooltip>
                                                angle: {item.angle}
                                            </Tooltip>
                                        </Marker>)}

                                    <RouteAircraft aircraft={aircraft} />
                                </LayerGroup>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name='Firm'>
                                <LayerGroup>
                                    {(isShowFirmData === true) && (
                                        <>
                                            <FirmNasa setFirm={setFirm} />
                                            {firm && firm.map((item, index) =>
                                                <Marker icon={firmMarker} rotationAngle={item.bearing} key={index} position={[item.latitude, item.longitude]}>
                                                    <Tooltip>
                                                        {
                                                            Object.keys(item).map(key =>
                                                                <div>
                                                                    <b>{key}</b>: {item[key]}
                                                                </div>
                                                            )
                                                        }

                                                    </Tooltip>
                                                </Marker>)}
                                        </>
                                    )}
                                </LayerGroup>
                            </LayersControl.Overlay>

                            <LayersControl.Overlay name='Province'>
                                <LayerGroup>
                                    <Province />
                                </LayerGroup>
                            </LayersControl.Overlay>


                            <LayersControl.Overlay checked name='Province'>
                                <LayerGroup>
                                    <FormData DefaultIcon={DefaultIcon} setData={setData} data={data} />
                                </LayerGroup>
                            </LayersControl.Overlay>

                        </LayersControl>
                    </MapContainer>
                </div>
                <div className="col-span-1 ...">
                    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen p-4 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-purple-100">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                    Location Registration
                                </h1>
                                <p className="text-gray-500 mt-2">Register a new place with its location details</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Place Name */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-indigo-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        onChange={onChangeData}
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                                        placeholder="Enter title"
                                    />
                                </div>

                                {/* Coordinates Section */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Latitude */}
                                    <div>
                                        <label htmlFor="latitude" className="block text-sm font-medium text-indigo-700 mb-1">
                                            Latitude
                                        </label>
                                        <input
                                            onChange={onChangeData}
                                            value={data.latitude}
                                            type="text"
                                            id="latitude"
                                            name="latitude"
                                            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                                            placeholder="e.g. 13.756331"
                                        />
                                    </div>

                                    {/* Longitude */}
                                    <div>
                                        <label htmlFor="longitude" className="block text-sm font-medium text-indigo-700 mb-1">
                                            Longitude
                                        </label>
                                        <input
                                            onChange={onChangeData}
                                            value={data.longitude}
                                            type="text"
                                            id="longitude"
                                            name="longitude"
                                            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                                            placeholder="e.g. 100.501762"
                                        />
                                    </div>
                                </div>
                                {/* Icon */}
                                <div>
                                    <label htmlFor="icon" className="block text-sm font-medium text-indigo-700 mb-1">
                                        Icon
                                    </label>
                                    <input
                                        onChange={onChangeData}
                                        type="text"
                                        id="icon"
                                        name="icon"
                                        placeholder='Find image address url'
                                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                                    />
                                </div>

                                {/* Size */}
                                <div>
                                    <label htmlFor="size" className="block text-sm font-medium text-indigo-700 mb-1">
                                        Size
                                    </label>
                                    <input
                                        onChange={onChangeData}
                                        type="range"
                                        id="size"
                                        name="size"
                                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                                        required
                                        readOnly
                                    />
                                </div>

                                {/* Get Current Location Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg hover:from-indigo-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default MapContent
