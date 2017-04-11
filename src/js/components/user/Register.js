import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import validator from 'validator';
import { BAD_REQUEST } from 'http-status-codes';

import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';

const NO_ERRORS = 0;

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            inProgress: false,
            register: false
        };
    }

    componentWillUnmount() {
        this.closePreviousErrors();
    }

    closePreviousErrors() {
        this.state.errors.forEach((error) => {
            Alert.close(error);
        });

        this.setState({ errors: [] });
    }

    checkForm() {
        const { username, email, password, confirmPassword } = this.state;
        const errorList = [];

        if (typeof username !== 'string' || !username || validator.isEmpty(username.trim())) {
            errorList.push(Alerts.createErrorAlert("The username entered is not valid."));
        }

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            errorList.push(Alerts.createErrorAlert("The email entered is not valid."));
        }

        if (!password || validator.isEmpty(password)) {
            errorList.push(Alerts.createErrorAlert("The password is required."));
        }

        if (password !== confirmPassword) {
            errorList.push(Alerts.createErrorAlert("The passwords entered don't match."));
        }

        this.setState({ errors: errorList });

        return errorList.length === NO_ERRORS;
    }

    handleError(error) {
        const { code, message } = error;
        console.error(code, message);

        this.closePreviousErrors();

        const currentError = Alerts.createErrorAlert(message);
        this.setState({
            errors: [currentError],
            inProgress: false,
            register: false
        });
    }

    sendEmailVerification(user) {
        const newUser = user
            ? user
            : firebase.auth().currentUser;

        if (!newUser.emailVerified) {
            Alerts.createInfoAlert(`A verification email has been sent to ${newUser.email}.`);
            newUser.sendEmailVerification();
        }
    }

    loginUser() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
            return firebase.auth().currentUser.getToken(true);
        }).
        then((token) => {
            return fetch('/api/user/auth/login', {
                body: JSON.stringify({ token }),
                headers: { 'Authorization': `Bearer ${token}` },
                method: 'POST'
            });
        }).
        then((response) => {
            const { status, statusText } = response;
            if (status >= BAD_REQUEST) {
                const error = new Error('Bad request');
                error.code = status;
                error.message = statusText;

                return Promise.reject(error);
            }

            return response.json();
        }).
        then(() => {
            this.sendEmailVerification();

            this.setState({
                inProgress: false,
                register: true
            });

            history.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    registerUser(event) {
        event.preventDefault();

        this.closePreviousErrors();

        if (!this.checkForm()) {
            return;
        }

        const { username, email, password, confirmPassword } = this.state;
        this.setState({ inProgress: true });

        fetch('/api/user/unauth/register', {
            body: JSON.stringify({
                confirmPassword,
                email,
                password,
                username
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            if (!response.ok) {
                const error = new Error('Bad request');
                error.code = response.error.status;
                error.message = response.error.message;

                throw error;
            }

            this.loginUser();
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    handleUsername(event) {
        event.preventDefault();
        this.setState({ username: event.target.value });
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleConfirmPassword(event) {
        event.preventDefault();
        this.setState({ confirmPassword: event.target.value });
    }

    render() {
        if (this.state.register) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { registerOK: true }
                }}/>
            );
        }

        let registerInProgress = null;
        if (this.state.inProgress) {
            registerInProgress = <span className="fa fa-spinner fa-spin" aria-hidden="true"/>;
        }

        return (
            <div className="colorAccentSecondary vert-align hor-align wrapper-fill">
                <Helmet>
                    <title>#iwashere - Register</title>
                </Helmet>

                <div className="container">
                    <div className="row main">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1>Sign up</h1>
                                <hr />
                            </div>
                        </div>
                        <div className="main-login main-center">
                            <form className="form-horizontal" onSubmit={this.registerUser.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="name" className="cols-sm-2 control-label">Username</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"/></span>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Enter your username" onChange={this.handleUsername.bind(this)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={this.handleEmail.bind(this)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" onChange={this.handlePassword.bind(this)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                            <input type="password" className="form-control" name="confirm" id="confirm" placeholder="Confirm your password" onChange={this.handleConfirmPassword.bind(this)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block login-button" onClick={this.registerUser.bind(this)}>Sign up</button>
                                </div>

                                <div className="form-group">
                                    <Link to="/login">Already have an account?</Link>
                                </div>

                            </form>
                            { registerInProgress }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = { history: PropTypes.object };
