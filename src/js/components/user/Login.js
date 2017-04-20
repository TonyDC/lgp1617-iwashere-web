import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import validator from 'validator';
import { GridLoader as Loader } from 'halogen';

import MyButton from '../utils/MyButton';
import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

const NO_ERROR = 0;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            inProgress: false
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

        const currentError = Alerts.createErrorAlert(message);
        this.setState({
            errors: [currentError],
            inProgress: false
        });
    }

    loginPopup(provider) {
        if (this.state.inProgress) {
            return;
        }

        this.setState({ inProgress: true });

        firebase.auth().signInWithPopup(provider).
        then(() => {
            this.setState({ inProgress: false });
            this.props.router.push('/');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    loginUser(event) {
        event.preventDefault();

        if (this.state.inProgress || !this.checkForm()) {
            return;
        }

        this.setState({ inProgress: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
            this.setState({ inProgress: false });
            this.props.router.push('/');
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
        this.closePreviousErrors();

        const { email, password } = this.state;
        const errorList = [];

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            errorList.push(Alerts.createErrorAlert("The email entered is not valid."));

        } else if (!password || validator.isEmpty(password)) {
            errorList.push(Alerts.createErrorAlert("The password is required."));
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
        let signInForm = null;
        let otherSignInOptions = null;
        let signInInProgress = null;

        if (this.state.inProgress) {
            signInInProgress =
                <FormGroup className="hor-align vert-align">
                    <h1 className="loader-text">Signing in progress...</h1>
                    <Loader color="#012935" className="loader"/>
                </FormGroup>;
        } else {
            signInForm =
                <Form horizontal className="login-form" onSubmit={ this.loginUser.bind(this) }>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-envelope fa" aria-hidden="true"/>
                            </InputGroup.Addon>
                            <FormControl
                                type="text"
                                value={this.state.email}
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
                                type="password"
                                value={this.state.password}
                                placeholder="Enter your password"
                                onChange={this.handlePassword.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="box">
                        <Button type="submit"
                                className="btn btn-primary btn-md btn-block login-button colorAccent"
                                onClick={ this.loginUser.bind(this) }>
                            Sign In
                        </Button>
                    </FormGroup>
                </Form>;

            otherSignInOptions =
                <div>
                    <FormGroup className="hor-align">
                        or
                    </FormGroup>

                    <FormGroup className="box">
                        <Button className="btn btn-block btn-social btn-md btn-facebook"
                                onClick={ this.loginFacebook.bind(this) }>
                            <span className="fa fa-facebook"/> Sign in with Facebook
                        </Button>
                    </FormGroup>

                    <FormGroup className="box">
                        <Button className="btn btn-block btn-social btn-md btn-google"
                                onClick={ this.loginGoogle.bind(this) }>
                            <span className="fa fa-google"/> Sign in with Google
                        </Button>
                    </FormGroup>

                    <MyButton url="/user/recover">Forgot your password?</MyButton>

                    <MyButton url="/user/register">Don't have an account?</MyButton>

                </div>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Sign in</title>
                </Helmet>
                { signInForm }
                { otherSignInOptions }
                { signInInProgress }
            </div>
        );
    }
}

Login.propTypes = { router: PropTypes.object.isRequired };

// To access Redux store
Login.contextTypes = { store: PropTypes.object };
