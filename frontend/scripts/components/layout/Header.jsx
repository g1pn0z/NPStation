import React, { Component } from 'react'
import { Link } from 'react-router'
import AltContainer from 'alt-container'
import ProfileStore from '../../stores/ProfileStore'
import NavLink from '../helpers/NavLink'
import AuthBlock from '../helpers/AuthBlock'


const Header = () => (
    <header className="header">
        <nav className="navbar navbar-dark bg-inverse navbar-fixed-top">
            <Link className="navbar-brand" to="/">Never Paranoid Station</Link>
            <div className="nav navbar-nav">
                <NavLink className="nav-item nav-link" to="/api_doc">API</NavLink>
                <NavLink className="nav-item nav-link" to="/download">скачать</NavLink>
            </div>
            <div className="pull-xs-right">
                <AltContainer store={ProfileStore}>
                    <AuthBlock />
                </AltContainer>
            </div>
        </nav>
    </header>
);


export default Header
