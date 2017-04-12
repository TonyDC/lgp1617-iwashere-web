import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Form, FormGroup, InputGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import validator from 'validator';
import { BAD_REQUEST } from 'http-status-codes';
import { GridLoader as Loader } from 'halogen';

import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

import logo from 'img/logo.png';

const NO_ERRORS = 0;

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            inProgress: false,
            registered: false
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
            registered: false
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
            this.sendEmailVerification();

            this.setState({
                inProgress: false,
                registered: true
            });

            this.props.history.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    registerUser(event) {
        event.preventDefault();

        if (this.state.inProgress) {
            return;
        }

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
        let submitButton = <div className="hor-align"><Loader color="#E5402A" size="10px" margin="5px"/></div>;
        if (!this.state.inProgress) {
            submitButton = <Button type="submit"
                                   className="btn-primary btn-md btn-block login-button colorAccent"
                                   onClick={ this.registerUser.bind(this) }>Sign Up</Button>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Sign up</title>
                </Helmet>

                <div>
                    <h1 className="form-title">Sign up</h1>
                    <hr/>
                </div>

                <Form horizontal onSubmit={this.registerUser.bind(this)}>
                    <FormGroup>
                        <ControlLabel htmlFor="username">Username</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-user fa" aria-hidden="true"/>
                            </InputGroup.Addon>
                            <FormControl
                                name="username"
                                type="text"
                                value={this.state.username}
                                placeholder="Enter your username"
                                onChange={this.handleUsername.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel htmlFor="email">Email</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-envelope fa" aria-hidden="true"/>
                            </InputGroup.Addon>
                            <FormControl
                                name="email"
                                type="text"
                                value={this.state.email}
                                placeholder="Enter your email"
                                onChange={this.handleEmail.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel htmlFor="password">Password</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-lock fa-lg" aria-hidden="true"/>
                            </InputGroup.Addon>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.handlePassword.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel htmlFor="confirm">Confirm Password</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-lock fa-lg" aria-hidden="true"/>
                            </InputGroup.Addon>
                            <FormControl
                                name="confirm"
                                type="password"
                                placeholder="Confirm your password"
                                onChange={this.handleConfirmPassword.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        { submitButton }
                    </FormGroup>

                    <FormGroup>
                        <Link to="/login">Already have an account?</Link>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Register.propTypes = { history: PropTypes.object };
