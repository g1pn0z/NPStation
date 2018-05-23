import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import Home from './components/pages/Home'
import Download from './components/pages/Download'
import ApiDoc from './components/pages/ApiDoc'
import Devices from './components/pages/Devices'
import DeviceDetail from './components/pages/DeviceDetail'
import Page from './components/layout/Page'
import Personal from './components/layout/Personal'


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route component={ Personal }>
                <IndexRoute component={ Home } />
                <Route path="devices" component={ Devices } />
                <Route path="devices/:id" component={ DeviceDetail } />
            </Route>
            <Route component={ Page }>
                <Route path="api_doc" component={ ApiDoc } />
                <Route path="download" component={ Download } />
            </Route>
        </Route>
    </Router>,
    document.getElementById("app")
);
