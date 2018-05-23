import alt from '../alt'
import DevicesActions from '../actions/DevicesActions'


class DevicesStore {
    devices = [];
    errorMessage = null;

    constructor() {
        this.bindListeners({
            _clearDevices: [DevicesActions.FETCH_DEVICES],
            _handleFetchDevicesFailed: DevicesActions.FETCH_DEVICES_FAILED,
            _handleUpdateDevices: DevicesActions.UPDATE_DEVICES
        });
        this.exportPublicMethods({
            getByID: this.getByID.bind(this)
        });
    }

    _clearDevices() {
        this.devices = [];
    }

    _handleFetchDevicesFailed(errorMessage) {
        this.errorMessage = errorMessage;
        this._clearDevices();
    }

    _handleUpdateDevices(devices) {
        try {
            this.errorMessage = null;
            this.devices = devices;
        } catch (e) {
            DevicesActions.fetchDevicesFailed("Что-то пошло не так");
        }
    }

    getByID(id) {
        console.log(id)
        console.log(this.devices.find(device => parseInt(device.id) === parseInt(id)))
        console.log(this.devices)
        return this.devices.find(device => device.id === id);
    }
}


export default alt.createStore(DevicesStore, 'DevicesStore')
