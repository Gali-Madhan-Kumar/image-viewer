import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    imagePostCard: {
        width: '100%',
    },
    avatar: {
        margin: 10,
    },
    tags: {
        color: 'blue',
    }
});

class Home extends Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            userData: {},
            data: []
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

        let userMediaInfo = null;
        let userMediaXhr = new XMLHttpRequest();
        userMediaXhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var userMediaData = JSON.parse(this.responseText).data;
                console.log(userMediaData);
                that.setState({ data: userMediaData })
            }
        })
        if (sessionStorage.getItem('access-token') !== null) {
            userMediaXhr.open("GET", this.props.userMediaInformation + '/?access_token=' + sessionStorage.getItem('access-token') + '');
            userMediaXhr.setRequestHeader("Cache-Control", "no-cache");
            userMediaXhr.send(userMediaInfo);
        }
    }


    postCreatedTime = (postCreatedTime) => {

        let createdTime = new Date();
        createdTime.setUTCSeconds(postCreatedTime);
        let yyyy = createdTime.getFullYear();
        let mm = createdTime.getMonth() + 1;
        let dd = createdTime.getDate();

        let HH = createdTime.getHours();
        let MM = createdTime.getMinutes();
        let ss = createdTime.getSeconds();

        let time = dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MM + ":" + ss;
        return time;
    }

    postHashTags = (details) => {
        const tags = details.tags.map(hashTags => {
            return "#" + hashTags + " ";
        })
        return tags;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header userProfileUrl={this.state.userData.profile_picture} />
                <div className="post-card">
                    {this.state.data.map(details => (
                        <div className="post" key={details.id}>
                            <Card className={classes.imagePostCard}>
                                <CardHeader avatar={<Icon>
                                    <Avatar>{details.user.profile_picture}</Avatar>
                                </Icon>}
                                    title={details.user.username}
                                    subheader={this.postCreatedTime(details.created_time)}
                                />
                                <CardContent>
                                    <div className="post-content">
                                        <img className="image-post" alt="" src={details.images.standard_resolution.url} />
                                    </div>
                                    <hr />
                                    <div className="caption">
                                        <Typography component="p">
                                            {details.caption.text.split('\n').map((item, key) => {
                                                return <span id={"post_caption_" + key} key={key}>{item}<br /></span>
                                            })}
                                            <span className={classes.tags}>{this.postHashTags(details)}</span>
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);