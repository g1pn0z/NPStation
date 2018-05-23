import React from 'react'
import PersonalMenu from '../blocks/PersonalMenu'
import LoginRequired from '../helpers/LoginRequired'


const Personal = ({ children }) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-md-3">
                <PersonalMenu />
            </div>
            <div className="col-xs-12 col-md-9">
                { children }
            </div>
        </div>
    </div>
);


export default LoginRequired(Personal)
