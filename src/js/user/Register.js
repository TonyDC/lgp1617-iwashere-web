import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            inProgress: false,
            register: false
        };
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
                </form>
                { registerInProgress }
                { errorMessage }
            </div>
        );
    }
}
