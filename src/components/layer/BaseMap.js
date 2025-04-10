//rafce
import React from 'react'
import { LayersControl, TileLayer } from 'react-leaflet'

const BaseMap = () => {
    return (
        <div>
            <LayersControl>
                <LayersControl.BaseLayer name='Stadia'>
                    <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg' />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name='Black and white'>
                    <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name='With out name'>
                    <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' />
                </LayersControl.BaseLayer>
            </LayersControl>
        </div>
    )
}

export default BaseMap
