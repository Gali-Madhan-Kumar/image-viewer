import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {

    searchInputField: {
        width: '100%',
    }
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    onOpenMenuHandler = () => {
        this.setState({
            isOpen: true,
        });
    }

    onCloseMenuHandler = () => {
        this.setState({
            isOpen: false
        });
    }

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
                            <IconButton id="menu" onClick={this.onOpenMenuHandler}>
                                <Avatar alt="User Profile Pic" src={this.props.userProfileUrl} />
                            </IconButton>
                            <div>
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    open={this.state.isOpen}
                                    onClose={this.onCloseMenuHandler}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: 62, left: 2000 }}>
                                    <span><MenuItem>My Account</MenuItem><hr style={{ marginRight: 10, marginLeft: 10, marginTop: 2, marginBottom: 0}}/></span>
                                    <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </header>)}
            </div>
        )
    }
}

export default Header;