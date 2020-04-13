import React, { Component } from 'react';
import '../profile/Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component {

    componentDidMount() {
        document.getElementById('search-div').style.display = 'none';
    }

    render() {
        return (
            <div>
                <Header />
            </div>
        )
    }
}

export default Profile;