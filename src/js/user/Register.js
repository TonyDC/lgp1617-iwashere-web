import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { BAD_REQUEST } from 'http-status-codes';

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

            // TODO save user info on db

            return newUser.getToken(true);
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
            <div>
                <h2>Register</h2>
                <form onSubmit={this.registerUser.bind(this)}>
                    <input name="email" placeholder="email" type="email" onChange={this.handleEmail.bind(this)}/>
                    <input name="password" placeholder="password" type="password" onChange={this.handlePassword.bind(this)}/>

                    <button type="submit" onClick={this.registerUser.bind(this)}>Register</button>
                    <button type="submit" onClick={this.registerWithFacebook.bind(this)}>Register with Facebook</button>
                    <button type="submit" onClick={this.registerWithGoogle.bind(this)}>Register with Google</button>
                </form>
                { registerInProgress }
                { errorMessage }
            </div>
        );
    }
}
