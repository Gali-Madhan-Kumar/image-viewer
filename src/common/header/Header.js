import React, { Component } from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {

    searchInputField: {
        width: '100%',
    },
}

const useStyles = theme => ({
    // styling the search box according to the instructions
    searchBox: {
        borderRadius: 4,
        backgroundColor: '#c0c0c0',
        width: 300,
        display: 'flex',
    },
});

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    // opens popover menu onclicking profileicon inside header by setting state to true
    onOpenMenuHandler = () => {
        this.setState({
            isOpen: true,
        });
    }

    // closes popover menu by setting as false
    onCloseMenuHandler = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* displays header without search box and profile icon in login page */}
                {(sessionStorage.getItem('access-token') === null || sessionStorage.getItem('access-token') !== "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784" ?
                    <header className="app-header">
                        <span className="app-logo">Image Viewer</span>
                    </header>
                    :
                    // displays header with search box and profile icon in home page 
                    <header className="app-header">
                        <span id="logo" className="app-logo">Image Viewer</span>
                        <div className={classes.searchBox} id="search-div">
                            <div className="searchIcon">
                                <SearchIcon />
                            </div>
                            <div className="searchInput">
                                <InputBase onChange={this.props.search} style={styles.searchInputField} placeholder="Search..." />
                            </div>
                        </div>
                        <div className="userProfile">
                            <IconButton id="menu" onClick={this.onOpenMenuHandler}>
                                <Avatar alt="User Profile Pic" src={this.props.userProfile} />
                            </IconButton>
                            <div>
                                {/* menu displays my account and logout options when user clicks on profile icon inside home page, 
                                in profile page menu displays only logout option to user when click on profile icon */}
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    open={this.state.isOpen}
                                    onClose={this.onCloseMenuHandler}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: 62, left: 2000 }}> {this.props.homePage === true && <div>
                                        <MenuItem onClick={this.props.profilepage}>My Account</MenuItem><hr style={{ marginRight: 10, marginLeft: 10, marginTop: 2, marginBottom: 0 }} />
                                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                    </div>}
                                    {this.props.profilePage === true && <div>
                                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                    </div>}
                                </Menu>
                            </div>
                        </div>
                    </header>)}
            </div>
        )
    }
}

export default withStyles(useStyles)(Header);