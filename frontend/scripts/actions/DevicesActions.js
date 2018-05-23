import alt from '../alt'
import { get_devices } from '../api/device'


class DevicesActions {

    fetchDevices(){
        return get_devices()
            .then(data => this.updateDevices(data))
            .catch(errorMessage => this.fetchDevicesFailed(errorMessage));
    }

    updateDevices(devices) {
        return devices;
    }

    fetchDevicesFailed(errorMessage){
        return errorMessage;
    }
}


export default alt.createActions(DevicesActions)
