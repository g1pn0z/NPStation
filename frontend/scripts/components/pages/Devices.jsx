import React, { Component } from 'react'
import AltContainer from 'alt-container'
import DevicesActions from '../../actions/DevicesActions'
import DevicesStore from '../../stores/DevicesStore'
import DevicesList from './DevicesList'
import DevicesOnMap from './DevicesOnMap'
import classNames from 'classnames'


class Devices extends Component {

    state = {
        type: 'map'
    };

    componentDidMount() {
        DevicesActions.fetchDevices();
    }

    render() {
        return (
            <div>
                <div className="btn-toolbar">
                    <div className="btn-group pull-xs-right">
                        <button
                            type="button"
                            className={classNames("btn", "btn-secondary", {"active": this.state.type === "map"})}
                            onClick={() => this.setState({type: "map"})}
                        >На карте</button>
                        <button
                            type="button"
                            className={classNames("btn", "btn-secondary", {"active": this.state.type === "list"})}
                            onClick={() => this.setState({type: "list"})}
                        >Список</button>
                    </div>
                </div>
                <AltContainer store={DevicesStore}>
                    {
                        this.state.type === "map"?
                        <DevicesOnMap /> :
                        <DevicesList />
                    }
                </AltContainer>
            </div>
        );
    }
}


export default Devices
