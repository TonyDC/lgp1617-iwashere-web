import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import httpCodes from 'http-status-codes';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

import Alerts from '../utils/Alerts';

const CONTENT_EDITOR_TYPE = 1;
const ADMINISTRATOR = 2;

const styles = {
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    paper: {
        padding: 20,
        overflow: 'auto'
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10
    },
    flatButton: {
        color: grey500
    },
    checkRemember: {
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
        },
        labelStyle: {
            color: grey500
        },
        iconStyle: {
            color: grey500,
            borderColor: grey500,
            fill: grey500
        }
    },
    loginBtn: {
        float: 'right'
    },
    btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
    },
    btnFacebook: {
        background: '#4f81e9'
    },
    btnGoogle: {
        background: '#e14441'
    },
    btnSpan: {
        marginLeft: 5
    },
};


export default class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // Check if user is logged in

        this.setState({ inProgress: true });

        // Login in Firebase
        // Check if user is entitled to enter the reserved area
        // If yes, get the type of user
        // If no, redirect to main page
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
            return firebase.auth().currentUser.getToken();
        }).
        then((token) => {
            return fetch('/api/reserved/user-type', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'GET'
            });
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                const error = new Error(response);
                error.httpStatus = response.status;

                return Promise.reject(error);
            }

            return response.json();
        }).
        then((res) => {
            const { type } = res;

            switch (type) {
                case CONTENT_EDITOR_TYPE:
                    localStorage.setItem('res', CONTENT_EDITOR_TYPE);
                    break;

                case ADMINISTRATOR:
                    localStorage.setItem('res', ADMINISTRATOR);
                    break;

                default:
                    return Promise.reject(new Error("Unknown user type"));
            }

            this.props.router.push('reserved/dash');

            return null;
        }).
        catch((error) => {
            const { httpStatus } = error;
            if (typeof httpStatus === 'number' && httpStatus >= httpCodes.BAD_REQUEST && httpStatus < httpCodes.INTERNAL_SERVER_ERROR) {
                Alerts.createErrorAlert('User without enough permissions');

                return null;
            }

            return Promise.reject(error.message);
        }).
        catch((error) => {
            Alerts.createErrorAlert(error);
        }).
        then(() => {
            this.setState({ inProgress: false });
        });
    }

    render() {
        return (
            <div style={styles.loginContainer}>
                <Paper style={styles.paper}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <TextField
                            hintText="E-mail"
                            floatingLabelText="E-mail"
                            fullWidth
                            onChange={this.handleEmail.bind(this)}
                        />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth
                            type="password"
                            onChange={this.handlePassword.bind(this)}
                        />

                        <div>
                            <RaisedButton type="submit" label="Login" primary style={styles.loginBtn} onTouchTap={this.handleSubmit.bind(this)} disabled={this.state.inProgress}/>
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
};

AdminLogin.propTypes = { router: PropTypes.object.isRequired };
