import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import { BAD_REQUEST } from 'http-status-codes';

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
        then((result) => {
            // Facebook Access Token; can be used to access the Facebook API.
            // const token = result.credential.accessToken;

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

                <h2>Login</h2>
                <form onSubmit={this.loginUser.bind(this)}>
                    <input name="email" placeholder="email" type="email" onChange={this.handleEmail.bind(this)}/>
                    <input name="password" placeholder="password" type="password" onChange={this.handlePassword.bind(this)}/>

                    <button type="submit" onClick={this.loginUser.bind(this)}>Log in</button>
                    <button type="submit" onClick={this.loginFacebook.bind(this)}>Facebook Log In</button>
                    <button type="submit" onClick={this.loginGoogle.bind(this)}>Google Log In</button>
                </form>
                { userStatus }
                <div>Response: { this.state.text }</div>
            </div>
        );
    }
}
