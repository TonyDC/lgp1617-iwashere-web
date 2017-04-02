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

    loginUser(event) {
        event.preventDefault();

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
            return firebase.auth().currentUser.getToken(/* forceRefresh */ true);
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
                return Promise.reject({
                    code: status,
                    message: statusText
                });
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
                </form>
                { userStatus }
                <div>Response: { this.state.text }</div>
            </div>
        );
    }
}
