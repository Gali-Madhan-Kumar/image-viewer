import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    card: {
        padding: '60px',
        width: '400px'
    },
    formControl: {
        width: '100%'
    }
}
class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            incorrectUsernamePassword: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        }
    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    loginClickHandler = () => {

        

        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username === "" || this.state.password === "") { 
            return; 
        }

        if (this.state.username === "user" && this.state.password === "password") {
            sessionStorage.setItem('access-token', '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
            this.setState({ loggedIn: true });
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="login-card">
                    <Card style={styles.card}>
                        <CardContent>
                            <Typography variant="h5">LOGIN</Typography><br />
                            <FormControl style={styles.formControl} required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.usernameChangeHandler}/>
                                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl style={styles.formControl} required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="text" password={this.state.password} onChange={this.passwordChangeHandler}/>
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br />
                            <div className={this.state.incorrectUsernamePassword}><span className="red">Incorrect username and/or password</span></div>
                            <Button id="login-button" variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;