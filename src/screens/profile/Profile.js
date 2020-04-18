import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardMedia, Divider } from '@material-ui/core';
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
import CardActions from '@material-ui/core/CardActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { GridList, GridListTile } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
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
    editModalCard: {
        position: "absolute",
        width: 250,
        backgroundColor: "white",
        padding: 16,
        outline: "none",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    },
    imagesGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginTop: 20,
    },
    gridList: {
        width: 1000,
    },
    imagePostModalCard: {
        display: 'flex',
        position: "absolute",
        width: 800,
        backgroundColor: "white",
        padding: 16,
        outline: "none",
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    },
    selectedImage: {
        width: '50%',
        backgroundSize: '100% 100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    addCommentBtn: {
        width: '18%',
        marginTop: 12,
        marginLeft: '2%',
    },
    userDetailsProfielIcon: {
        '&:hover': {
            backgroundColor: 'transparent !important',
        }
    },
    profilePicModalCard: {
        display: 'flex',
        position: "absolute",
        backgroundColor: "white",
        padding: 16,
        outline: "none",
        top: '50%',
        left: `50%`,
        transform: 'translate(-50%, -50%)'
    },
    profilePicImage: {
        width: '100%',
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null || sessionStorage.getItem('access-token') !== "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784") {
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
            userMediaData: [],
            newComment: "",
            selectedImagePost: null,
            selectedImagePostIndex: -1,
            isPostModalOpen: false,
            isProfilePicModalOpen: false,
        }
    }

    componentDidMount() {

        let that = this;

        if (sessionStorage.getItem('access-token') !== null && sessionStorage.getItem('access-token') === "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784") {
            let info = null;
            let xhr = new XMLHttpRequest();
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
            xhr.open("GET", this.props.userInformationUrl + '/?access_token=' + sessionStorage.getItem('access-token') + '');
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.send(info);

            let media = null;
            let xhrMedia = new XMLHttpRequest();
            xhrMedia.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    const userMediaData = JSON.parse(this.responseText).data;
                    that.setState({
                        userMediaData: userMediaData,
                    })
                }
            })
            xhrMedia.open("GET", this.props.userMediaInformation + '/?access_token=' + sessionStorage.getItem('access-token') + '');
            xhrMedia.setRequestHeader("Cache-Control", "no-cache");
            xhrMedia.send(media);

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
            isEditModalOpen: true,
        });
    };

    editModlaCloseHandler = () => {
        this.setState({
            isEditModalOpen: false,
            fullNameRequired: "dispNone",
        });
    }

    fullNameChangeHandler = (e) => {
        this.setState({
            updatedFullName: e.target.value,
        })
    }

    onUpdateClickHandler = () => {

        this.state.updatedFullName === "" ? this.setState({
            fullNameRequired: "dispBlock",
        }) : this.setState({
            fullNameRequired: "dispNone",
        });

        if (this.state.updatedFullName !== "") {
            this.setState({
                fullname: this.state.updatedFullName,
                isEditModalOpen: false,
                updatedFullName: "",
            });
        }
    }

    onImagePostClickOpenHandler = (postId, index) => {
        const userPostedImages = this.state.userMediaData;
        this.setState({
            selectedImagePost: userPostedImages[index],
            selectedImagePostIndex: index,
            isPostModalOpen: true,
        });
    }

    onImagePostClickCloseHandler = () => {
        this.setState({
            isPostModalOpen: false,
            selectedImagePostIndex: -1,
            selectedImagePost: null,
        });
    }

    inputCommentAddHandler = (e) => {
        this.setState({
            newComment: e.target.value,
        })
    }

    onLikeClickHandler = () => {

        let selectedImagePost = this.state.selectedImagePost;
        let posts = this.state.userData;
        const index = this.state.selectedImagePostIndex;
        if (selectedImagePost.user_has_liked) {
            selectedImagePost.user_has_liked = false;
            selectedImagePost.likes.count += 1;
        } else {
            selectedImagePost.user_has_liked = true;
            selectedImagePost.likes.count -= 1;
        }

        posts[index] = this.selectedImagePost;

        this.setState({
            selectedImagePost: selectedImagePost,
            userData: posts
        });

    }

    onAddCommentHandler = () => {
        if (this.state.newComment === "") {
            return;
        } else {
            let selectedImagePost = this.state.selectedImagePost;
            selectedImagePost.comments["data"] = selectedImagePost.comments["data"] || [];
            selectedImagePost.comments["data"].push({
                id: selectedImagePost.comments["data"].length + 1,
                comment_by: this.state.username,
                comment_value: this.state.newComment
            });

            let posts = this.state.userData;
            const index = this.state.selectedImagePostIndex;
            posts[index] = this.selectedImagePost;

            this.setState({
                selectedImagePost: selectedImagePost,
                userData: posts,
                newComment: "",

            });
        }
    }

    onOpenProfilePicModalHandler = () => {
        this.setState({
            isProfilePicModalOpen: true,
        });
    }

    onCloseProfilePicModalHandler = () => {
        this.setState({
            isProfilePicModalOpen: false,
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Header userProfile={this.state.profilepicture} logout={this.onLogoutClickHandler} profilePage={this.state.isProfilePage} />
                <div className="user-details">
                    <Card className={classes.detailsCard}>
                        <CardHeader style={{ paddingBottom: 0 }} avatar={
                            <IconButton className={classes.userDetailsProfielIcon} onClick={this.onOpenProfilePicModalHandler}>
                                <Avatar className={classes.avatar} src={this.state.profilepicture} />
                            </IconButton>
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
                        <div>
                            <Modal open={this.state.isProfilePicModalOpen} onClose={this.onCloseProfilePicModalHandler}>
                                <Card className={classes.profilePicModalCard}>
                                    <CardContent>
                                        <img className={classes.profilePicImage} src={this.state.profilepicture} alt="" />
                                    </CardContent>
                                </Card>
                            </Modal>
                        </div>
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
                                        <Card className={classes.editModalCard}>
                                            <CardContent>
                                                <Typography variant="h5" id="edit" className="modal-heading">Edit</Typography>
                                                <FormControl required className="formControl" style={{ width: '100%' }}>
                                                    <InputLabel htmlFor="username">Full Name</InputLabel>
                                                    <Input id="fullname" type="text" onChange={this.fullNameChangeHandler} />
                                                    <FormHelperText className={this.state.fullNameRequired}>
                                                        <span className="red">required</span>
                                                    </FormHelperText>
                                                </FormControl><br /><br />
                                                <Button variant="contained" id="update" color="primary" onClick={this.onUpdateClickHandler}>UPDATE</Button>
                                            </CardContent>
                                        </Card>
                                    </Modal>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
                <div className={classes.imagesGrid}>
                    <GridList cellHeight={300} className={classes.gridList} cols={3}>
                        {(this.state.userMediaData || []).map((imagePost, index) => (
                            <GridListTile key={imagePost.id} onClick={() => this.onImagePostClickOpenHandler(imagePost.id, index)}>
                                <img src={imagePost.images.standard_resolution.url} alt="" />
                            </GridListTile>
                        ))}
                    </GridList>
                    {this.state.selectedImagePost !== null ?
                        <Modal open={this.state.isPostModalOpen} onClose={this.onImagePostClickCloseHandler}>
                            <Card className={classes.imagePostModalCard}>
                                <CardMedia
                                    className={classes.selectedImage}
                                    image={this.state.selectedImagePost.images.standard_resolution.url}
                                />
                                <div className={classes.details}>
                                    <CardHeader style={{ paddingBottom: 5, paddingTop: 0 }} avatar={
                                        <Avatar src={this.state.selectedImagePost.user.profile_picture} alt="" />
                                    } title={
                                        <Typography variant="h6" component="h6">
                                            {this.state.selectedImagePost.user.username}
                                        </Typography>
                                    } />
                                    <Divider style={{ marginLeft: 16, backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
                                    <CardContent style={{ paddingTop: 10 }}>
                                        <Typography component="p">
                                            {this.state.selectedImagePost.caption.text.split("\n")[0]}
                                        </Typography>
                                        {(this.state.selectedImagePost.tags || []).map((tag, index) => {
                                            return (
                                                <Typography key={tag} variant="caption" color="primary">
                                                    {" "}#{tag}
                                                </Typography>
                                            )
                                        })}
                                        <div className="display-comments">
                                            <Grid className="comments-grid">
                                                <Grid >
                                                    {(this.state.selectedImagePost.comments.data || []).map((comment) => {
                                                        return <Typography style={{ marginTop: 10, marginBottom: 10 }} key={comment.id}>
                                                            <span className="commented-by"><b>{comment.comment_by}:</b></span>
                                                            <span className="comment"> {comment.comment_value}</span>
                                                        </Typography>
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="like-and-comment-div">
                                            <div>
                                                <CardActions style={{ padding: 0, marginTop: 10, marginBottom: 10 }}>
                                                    <IconButton style={{ padding: 0 }} onClick={this.onLikeClickHandler}>
                                                        {this.state.selectedImagePost.user_has_liked ?
                                                            <FavoriteBorder /> :
                                                            <Favorite style={{ color: 'red' }} />
                                                        }
                                                    </IconButton>
                                                    <div className="totalLikes">
                                                        <span >{this.state.selectedImagePost.likes.count} likes</span>
                                                    </div>
                                                </CardActions>
                                            </div>
                                            <div>
                                                <FormControl className="formControl" style={{ width: '80%' }}>
                                                    <InputLabel htmlFor="commentText">
                                                        Add a comment{" "}
                                                    </InputLabel>
                                                    <Input id="commentText" type="text" onChange={this.inputCommentAddHandler} value={this.state.newComment} />
                                                </FormControl>
                                                <Button className={classes.addCommentBtn} variant="contained" color="primary" onClick={this.onAddCommentHandler}>ADD</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </Modal>
                        : ""
                    }
                </div>
            </div>

        )
    }
}

export default withStyles(styles)(Profile);