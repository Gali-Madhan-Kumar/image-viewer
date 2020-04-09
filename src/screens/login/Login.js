import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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
                                <Input id="username" type="text" placeholder="Username" />
                            </FormControl><br /><br />
                            <FormControl style={styles.formControl} required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="text" placeholder="Password" />
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;