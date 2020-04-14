import React, { Component } from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './profile/Profile';

class Controller extends Component {
    constructor() {
        super();
        this.userInformationUrl = "https://api.instagram.com/v1/users/self";
        this.userMediaInformation = "https://api.instagram.com/v1/users/self/media/recent";
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={({ history }, props) => <Login {...props} history={history} />} />
                    <Route exact path='/home' render={({ history }, props) => <Home {...props} history={history} userInformationUrl={this.userInformationUrl} userMediaInformation={this.userMediaInformation} />} />
                    <Route exact path='/profile' render={({ history }, props) => <Profile {...props} history={history} userInformationUrl={this.userInformationUrl} userMediaInformation={this.userMediaInformation} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;