import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Fab, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import '../profile/Profile.css';

const styles = theme => ({
    detailsCard: {
        width: 400,
        boxShadow: 'none',
    },
    avatar: {
        width: '50px',
        height: '50px',
    },
    modal: {
        position: "absolute",
        width: 250,
        backgroundColor: "white",
        padding: 16,
        outline: "none",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            userData: [],
            isProfilePage: true,
            media: "",
            username: "",
            follows: "",
            profilepicture: "",
            followedBy: "",
            fullNameRequired: "dispNone",
            fullname: "",
            isEditModalOpen: false,
            updatedFullName: "",
        }
    }

    componentDidMount() {

        let info = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var data = JSON.parse(this.responseText).data;
                that.setState({
                    userData: data,
                    media: data.counts.media,
                    username: data.username,
                    follows: data.counts.follows,
                    profilepicture: data.profile_picture,
                    followedBy: data.counts.followed_by,
                    fullname: data.full_name,
                })
            }
        })
        if (sessionStorage.getItem('access-token') !== null) {
            xhr.open("GET", this.props.userInformationUrl + '/?access_token=' + sessionStorage.getItem('access-token') + '');
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(info);
        }
        if (sessionStorage.getItem('access-token') !== null) {
            document.getElementById('search-div').style.display = 'none';
            document.getElementById('logo').style.cursor = 'pointer';
            document.getElementById('logo').addEventListener("click", function () {
                window.location.href = "/home";
            });
        }
    }

    onLogoutClickHandler = () => {
        sessionStorage.removeItem('access-token');
        this.props.history.push('/');
    }

    editModalOpenHandler = () => {
        this.setState({
            updatedFullName: this.state.fullnname,
            isEditModalOpen: true
        });
    };

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Header userProfileUrl={this.state.profilepicture} logout={this.onLogoutClickHandler} profilePage={this.state.isProfilePage} />
                <div className="user-details">
                    <Card className={classes.detailsCard}>
                        <CardHeader style={{ paddingBottom: 0 }} avatar={
                            <Avatar className={classes.avatar} src={this.state.profilepicture} />
                        } title={
                            <Typography variant="h5" component="h5" style={{ marginLeft: 18, marginBottom: 5 }}>
                                {this.state.username}
                            </Typography>
                        }
                            subheader={
                                <Grid container style={{ color: 'black' }} spacing={3} alignItems="center" justify="center">
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Posts: {this.state.media}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Follows: {this.state.follows}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Followed By: {this.state.followedBy}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            } />
                        <CardContent style={{ paddingTop: 0 }}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item style={{ marginLeft: 85 }}>
                                    <Typography variant="subtitle1">
                                        {this.state.fullname}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Fab style={{ width: 40, height: 40 }} color="secondary" aria-label="edit" onClick={this.editModalOpenHandler}>
                                        <EditIcon />
                                    </Fab>
                                    <Modal open={this.state.isEditModalOpen} onClose={this.editModalCloseHandler}>
                                        <Card className={classes.modal}>
                                            <CardContent>
                                                <Typography variant="h5" id="edit" className="modal-heading">Edit</Typography>
                                                <FormControl required className="formControl" style={{ width: '100%' }}>
                                                    <InputLabel htmlFor="username">Full Name</InputLabel>
                                                    <Input id="fullname" type="text" />
                                                    <FormHelperText className={this.state.fullNameRequired}>
                                                        <span className="red">Required</span>
                                                    </FormHelperText>
                                                </FormControl><br /><br />
                                                <Button variant="contained" id="update" color="primary">UPDATE</Button>
                                            </CardContent>
                                        </Card>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Profile);