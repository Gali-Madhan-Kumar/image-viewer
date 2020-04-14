import React, { Component } from 'react';
import '../profile/Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isProfilePage: true,
        }
    }

    componentDidMount() {

        let info = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var data = JSON.parse(this.responseText).data;
                that.setState({ userData: data })
            }
        })
        if (sessionStorage.getItem('access-token') !== null) {
            xhr.open("GET", this.props.userInformationUrl + '/?access_token=' + sessionStorage.getItem('access-token') + '');
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(info);
        }

        document.getElementById('search-div').style.display = 'none';
        console.log(document.getElementById('popover-menu'));
    }

    onLogoutClickHandler = () => {
        sessionStorage.removeItem('access-token');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Header userProfileUrl={this.state.userData.profile_picture} logout={this.onLogoutClickHandler} profilePage={this.state.isProfilePage}/>
            </div>
        )
    }
}

export default Profile;