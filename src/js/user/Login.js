import React, { Component } from 'react';
import Alert from 'react-s-alert';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { BAD_REQUEST } from 'http-status-codes';
const validator = require('validator');

import 'styles/login.scss';
import 'styles/utils.scss';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            loggedIn: firebase.auth().currentUser !== null
        };
    }

    closePreviousErrors() {
        this.state.errors.forEach((error) => {
            Alert.close(error);
        });

        this.setState({ errors: [] });
    }

    newError(errorMessage) {
        return Alert.error(errorMessage, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });
    }

    componentWillUnmount() {
        this.closePreviousErrors();
    }

    handleError(error) {
        const { code, message } = error;
        console.error(code, message);

        this.closePreviousErrors();

        const currentError = Alert.error(message, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });

        this.setState({
            errors: [currentError],
            loggedIn: false
        });
    }

    loginPopup(provider) {
        firebase.auth().signInWithPopup(provider).
        then(() => {
            // Facebook/google Access Token; can be used to access APIs.
            // Parameter: result
            // Code: const token = result.credential.accessToken;

            // 'getToken(/* forceRefresh */ true)'
            return firebase.auth().currentUser.getToken(true);
        }).
        then((token) => {
            return fetch('/api/user/auth/login', {
                body: JSON.stringify({token}),
                headers: {'Authorization': `Bearer ${token}`},
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
            this.props.history.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    loginFacebook(event) {
        event.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();

        this.loginPopup(provider);
    }

    loginGoogle(event) {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();

        this.loginPopup(provider);
    }

    checkForm() {

        const { email, password } = this.state;
        const errorList = [];

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            errorList.push(this.newError("The email entered is not valid."));
        }

        if (!password || validator.isEmpty(password)) {
            errorList.push(this.newError("The password is required."));
        }

        this.setState({ errors: errorList });

        return errorList.length === 0;
    }

    loginUser(event) {
        event.preventDefault();

        if (!this.checkForm()) {
            return;
        }

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
            // 'getToken(/* forceRefresh */ true)'
            return firebase.auth().currentUser.getToken(true);
        }).
        then((token) => {
            return fetch('/api/user/auth/login', {
                body: JSON.stringify({token}),
                headers: {'Authorization': `Bearer ${token}`},
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
            this.props.history.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>#iwashere - Sign in</title>
                </Helmet>
                <div className="container">
                    <div className="row main">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1>Sign in</h1>
                                <hr/>
                            </div>
                        </div>

                        <div className="main-login main-center">
                            <form className="form-horizontal" onSubmit={ this.loginUser.bind(this) }>
                                <div className="form-group">
                                    <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={ this.handleEmail.bind(this) }/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" onChange={ this.handlePassword.bind(this) }/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block login-button" onClick={ this.loginUser.bind(this) }>Sign In</button>
                                </div>
                            </form>

                            <div className="form-group hor-align">
                                <p> or </p>
                            </div>

                            <div className="form-group" >
                                <button className="btn btn-block btn-social btn-facebook" onClick={ this.loginFacebook.bind(this) }>
                                    <span className="fa fa-facebook"/> Sign in with Facebook
                                </button>
                            </div>

                            <div className="form-group" >
                                <button className="btn btn-block btn-social btn-google" onClick={ this.loginGoogle.bind(this) }>
                                    <span className="fa fa-google"/> Sign in with Google
                                </button>
                            </div>

                            <div className="form-group">
                                <Link to="/password-reset">Forgot your password?</Link>
                            </div>

                            <div className="form-group">
                                <Link to="/register">Don't have an account?</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
