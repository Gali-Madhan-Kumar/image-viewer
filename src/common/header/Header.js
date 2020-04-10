import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'

const styles = {
    searchInputField: {
        width: '100%',
    }
}
class Header extends Component {

    render() {
        return (
            <div>
                {(sessionStorage.getItem('access-token') == null ?
                    <header className="app-header">
                        <span className="app-logo">Image Viewer</span>
                    </header>
                    :
                    <header className="app-header">
                        <span className="app-logo">Image Viewer</span>
                        <div className="searchBox">
                            <div className="searchIcon">
                                <SearchIcon />
                            </div>
                            <div className="searchInput">
                                <InputBase style={styles.searchInputField} placeholder="Search..." />
                            </div>
                        </div>
                        <div className="userProfile">
                            <IconButton>
                                <Avatar alt="User Profile Pic" src={this.props.userProfileUrl} />
                            </IconButton>
                        </div>
                    </header>)}
            </div>
        )
    }
}

export default Header;