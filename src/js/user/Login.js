import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { BAD_REQUEST } from 'http-status-codes';

import 'styles/login.scss';
import 'styles/utils.scss';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            text: null
        };
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
        then((body) => {
            this.setState({
                loggedIn: true,
                text: body.text
            });
        }).
        catch((error) => {
            // Handle Errors here.
            const { code, message } = error;
            console.error(code, message);

            this.setState({loggedIn: false});
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

    loginUser(event) {
        event.preventDefault();

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
        then((body) => {
            this.setState({
                loggedIn: true,
                text: body.text
            });
            this.props.history.push('/');
        }).
        catch((error) => {
            // Handle Errors here.
            const { code, message } = error;
            console.error(code, message);

            this.setState({loggedIn: false});
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
        let userStatus = null;
        if (this.state.loggedIn) {
            userStatus = <div>Logged in</div>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Login</title>
                </Helmet>
                <div className="container">
                    <div className="row main">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1 className="title">#iwashere</h1>
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
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your Email" onChange={ this.handleEmail.bind(this) }/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your Password" onChange={ this.handlePassword.bind(this) }/>
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
                                <button className="btn btn-block btn-social btn-lg btn-facebook" onClick={ this.loginFacebook.bind(this) }>
                                    <span className="fa fa-facebook"/> Sign in with Facebook
                                </button>
                            </div>

                            <div className="form-group" >
                                <button className="btn btn-block btn-social btn-lg btn-google" onClick={ this.loginGoogle.bind(this) }>
                                    <span className="fa fa-google"/> Sign in with Google
                                </button>
                            </div>

                            <div className="form-group">
                                <Link to="/forgot">Forgot Password</Link>
                            </div>
                            { userStatus }
                            Response: { this.state.text }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
