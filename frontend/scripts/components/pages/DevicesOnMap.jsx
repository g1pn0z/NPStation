import React from 'react'
import { Map, Marker, MarkerLayout } from 'yandex-map-react'



const DevicesOnMap = ({devices}) => (
    <div className="personalContent">
        <Map
            onAPIAvailable={function () { }}
            width={'100%'}
            state={{
                controls: ['default']
            }}
            center={[55.754734, 37.583314]}
            zoom={10}
        >
            {devices.map(({id, latitude, longitude, title, model}, index) =>  (
                <Marker
                    key={`marker_${index}`}
                    lat={parseFloat(latitude)}
                    lon={parseFloat(longitude)}
                    properties={{
                        hintContent: title || model
                    }}
                />
            ))}
        </Map>
    </div>
);


export default DevicesOnMap
