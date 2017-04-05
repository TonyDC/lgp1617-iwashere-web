import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { BAD_REQUEST } from 'http-status-codes';
import 'styles/login.scss';

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

                            <div className="form-group ">
                                <a className="btn btn-primary btn-lg btn-block login-button" onClick={this.loginUser.bind(this)}>Sign In</a>
                            </div>

                            <div className="form-group" >
                                <a className="btn btn-block btn-social btn-lg btn-facebook">
                                    <span className="fa fa-facebook"/> Sign in with Facebook
                                </a>
                            </div>

                            <div className="form-group" >
                                <a className="btn btn-block btn-social btn-lg btn-google">
                                    <span className="fa fa-google"/> Sign in with Google
                                </a>
                            </div>

                            <div className="form-group">
                                <Link to="/forgot">Forgot Password</Link>
                            </div>
                                            { userStatus }
                            Response: { this.state.text }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
