import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { BAD_REQUEST } from 'http-status-codes';

import 'styles/register.scss';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            inProgress: false,
            register: false
        };
    }

    loginPopup(provider) {
        firebase.auth().signInWithPopup(provider).
        then(() => {
            const newUser = firebase.auth().currentUser;

            return newUser.getToken(true);
        }).
        then(() => {
            // TODO save user info on db
            return fetch('/api/user/auth/register', {
                body: JSON.stringify({token}),
                method: 'POST'
            });
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

    registerWithFacebook(event) {
        event.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();

        this.loginPopup(provider);
    }

    registerWithGoogle(event) {
        event.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();

        this.loginPopup(provider);
    }

    registerUser(event) {
        event.preventDefault();

        const { email, password } = this.state;
        this.setState({inProgress: true});

        firebase.auth().createUserWithEmailAndPassword(email, password).
        then(() => {
            this.setState({
                inProgress: false,
                register: true
            });
        }).
        catch((error) => {
            // Handle Errors here.
            const { code, message } = error;
            console.error(code, message);

            this.setState({
                error: true,
                inProgress: false,
                register: false
            });
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
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <div>Error in registering the user</div>;
        }

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
            <div className="container">
                <div className="row main">
                    <div className="panel-heading">
                        <div className="panel-title text-center">
                            <h1 className="title">#iwashere</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="main-login main-center">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="cols-sm-2 control-label">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group" onSubmit={this.registerUser.bind(this)}>
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Enter your Name" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Enter your Email" onChange={this.handleEmail.bind(this)}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Enter your Password" onSubmit={this.handlePassword.bind(this)}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                        <input type="password" className="form-control" name="confirm" id="confirm" placeholder="Confirm your Password"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button" onClick={this.registerUser.bind(this)}>Sign up</button>
                            </div>
                            <div className="form-group">
                                <p> or </p>
                            </div>

                            <div className="form-group" >
                                <a className="btn btn-block btn-social btn-lg btn-facebook" onClick={this.registerWithFacebook.bind(this)}>
                                    <span className="fa fa-facebook"/> Sign up with Facebook
                                </a>
                            </div>

                            <div className="form-group" >
                                <a className="btn btn-block btn-social btn-lg btn-google" onClick={this.registerWithGoogle.bind(this)}>
                                    <span className="fa fa-google"/> Sign up with Google
                                </a>
                            </div>

                            { registerInProgress }
                            { errorMessage }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
