import React from 'react'
import { browserHistory } from 'react-router'


const DevicesList = ({devices}) => (
    <div className="personalContent">
        <table className="table table-hover">
            <thead><tr>
                <th>Title</th>
                <th>Model</th>
                <th>IMEI</th>
                <th>Phone number</th>
            </tr></thead>
            <tbody>
            {devices.map((device, index) => (
                <tr
                    key={index}
                    onClick={() => browserHistory.push(`/devices/${device.id}`)}
                >
                    <td>{device.title}</td>
                    <td>{device.model}</td>
                    <td>{device.imei}</td>
                    <td>{device.phone_number}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);


export default DevicesList
