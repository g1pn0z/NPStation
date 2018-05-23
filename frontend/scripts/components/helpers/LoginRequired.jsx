import React, { Component } from 'react'
import AltContainer from 'alt-container'
import ProfileStore from '../../stores/ProfileStore'
import Page from '../layout/Page'
import Login from '../pages/Login'


const LoginRequired = ({ component: WrappedComponent, ...props }) => (
    props.is_logged_in ?
        <WrappedComponent {...props} />
        : <Page><Login {...props} /></Page>
);


export default WrappedComponent =>
    props => (
        <AltContainer store={ProfileStore}>
            <LoginRequired {...props} component={WrappedComponent} />
        </AltContainer>
    );
