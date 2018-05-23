import React, { Component } from 'react'
import Header from './layout/Header.jsx'
import ProfileActions from '../actions/ProfileActions'


export default class App extends Component {

    componentDidMount(){
        ProfileActions.checkApiKey();
    }

    render(){
        return(
            <div className="page">
                <Header />
                <div className="page__content">
                    { this.props.children }
                </div>
            </div>
        );
    }
};
