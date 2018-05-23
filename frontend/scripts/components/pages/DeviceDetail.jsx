import React, { Component } from 'react'
import { Link } from 'react-router'
import AltContainer from 'alt-container'
import DevicesStore from '../../stores/DevicesStore'
import DevicesActions from '../../actions/DevicesActions'


const DeviceInfo = ({deviceID, devices}) => {
    let device = devices.find(d => parseInt(d.id) === parseInt(deviceID));
    if(device) {
        return (
            <table className="table table-bordered table-hover">
                <tbody>
                    <tr><th>Title</th><td>{device.title}</td></tr>
                    <tr><th>Model</th><td>{device.model}</td></tr>
                    <tr><th>IMEI</th><td>{device.imei}</td></tr>
                    <tr><th>Phone Number</th><td>{device.phone_number}</td></tr>
                    <tr><th>Mac</th><td>{device.mac}</td></tr>
                    <tr><th>USB id code</th><td>{device.usb_id_code}</td></tr>
                    <tr><th>Latitude</th><td>{device.latitude}</td></tr>
                    <tr><th>Longitude</th><td>{device.longitude}</td></tr>
                    <tr><th>Height</th><td>{device.height}</td></tr>
                    <tr><th>Cell ID</th><td>{device.cell_id}</td></tr>
                    <tr><th>IP info</th><td>{device.ip_info}</td></tr>
                    <tr><th>WiFi info</th><td>{device.wifi_info}</td></tr>
                    <tr><th>Battery info</th><td>{device.battery_info}</td></tr>
                    <tr><th>Webcam picture</th><td>{device.webcam_picture}</td></tr>
                    <tr><th>Code</th><td>{device.code}</td></tr>
                </tbody>
            </table>
        );
    } else {
        return (
            <div className="alert alert-danger">
                Устройство не найдено
            </div>
        );
    }
};


class DeviceDetail extends Component {

    componentDidMount() {
        DevicesActions.fetchDevices();
    }

    render() {
        return (
            <div>
                <div className="btn-toolbar">
                    <div className="btn-group">
                        <Link className="btn btn-secondary" to="/devices">« Назад к списку устройств</Link>
                    </div>
                </div>
                <div className="personalContent">
                    <AltContainer store={DevicesStore}>
                        <DeviceInfo deviceID={this.props.params.id} />
                    </AltContainer>
                </div>
            </div>
        );
    }
}


export default DeviceDetail
