import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import validator from 'validator';

import { loginActionCreator } from '../redux/action creators/login';

import 'styles/login.scss';
import 'styles/utils.scss';

import logo from 'img/logo.png';

const NO_ERROR = 0;

export default class Login extends Component {

    static newError(errorMessage) {
        return Alert.error(errorMessage, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            loggedIn: firebase.auth().currentUser !== null
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
            this.props.history.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    loginUser(event) {
        event.preventDefault();

        if (!this.checkForm()) {
            return;
        }

        this.context.store.dispatch(loginActionCreator({id: 'asldhjgaksjhgf', name: '123456789'}));

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
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
            errorList.push(Login.newError("The email entered is not valid."));

        } else if (!password || validator.isEmpty(password)) {
            errorList.push(Login.newError("The password is required."));
        }

        this.setState({ errors: errorList });

        return errorList.length === NO_ERROR;
    }


    handleEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="colorAccentSecondary">
                <Helmet>
                    <title>#iwashere - Sign in</title>
                </Helmet>

                <div className="container">
                    <div className="row main">
                        <div className="main-login main-center">
                            <div className="panel-heading">
                                <div className="panel-title text-center">
                                    <img src={logo} alt="#iwashere logo"/>
                                </div>
                            </div>
                            <Form horizontal onSubmit={ this.loginUser.bind(this) }>
                                <FormGroup onSubmit={ this.loginUser.bind(this)}>
                                    <InputGroup>
                                        <InputGroup.Addon>
                                            <i className="fa fa-envelope fa" aria-hidden="true"/>
                                        </InputGroup.Addon>
                                        <FormControl
                                            type="text"
                                            value={this.state.value}
                                            placeholder="Enter your email"
                                            onChange={this.handleEmail.bind(this)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon>
                                            <i className="fa fa-lock fa-lg" aria-hidden="true"/>
                                        </InputGroup.Addon>
                                        <FormControl
                                            type="text"
                                            value={this.state.value}
                                            placeholder="Enter your password"
                                            onChange={this.handlePassword.bind(this)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit"
                                            className="btn-primary btn-md btn-block login-button colorAccent"
                                            onClick={ this.loginUser.bind(this) }>
                                        Sign In
                                    </Button>
                                </FormGroup>
                            </Form>

                            <FormGroup className="hor-align">
                                or
                            </FormGroup>

                            <FormGroup>
                                <Button className="btn-block btn-social btn-md btn-facebook"
                                        onClick={ this.loginFacebook.bind(this) }>
                                    <span className="fa fa-facebook"/> Sign in with Facebook
                                </Button>
                            </FormGroup>

                            <FormGroup>
                                <Button className="btn-block btn-social btn-md btn-google"
                                        onClick={ this.loginGoogle.bind(this) }>
                                    <span className="fa fa-google"/> Sign in with Google
                                </Button>
                            </FormGroup>


                            <FormGroup>
                                <Link to="/password-reset">Forgot your password?</Link>
                            </FormGroup>

                            <FormGroup>
                                <Link to="/register">Don't have an account?</Link>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = { history: React.PropTypes.object };

// To access Redux store
Login.contextTypes = { store: React.PropTypes.object };
