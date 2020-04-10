import React, {Component} from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {
    render() {
        return(
            <Router>
                <div className="main-container">
                <Route exact path='/' render={({history}, props) => <Login {...props} history={history}/>} />
                <Route exact path='/home' render={({history}, props) => <Home {...props} history={history}/>} />
                </div>
            </Router>
        )
    }
}

export default Controller;