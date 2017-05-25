import React, { Component } from "react";
import PropTypes from "prop-types";
import Alert from "react-s-alert";
import { Helmet } from "react-helmet";
import * as firebase from "firebase";
import nProgress from "nprogress";
import { FormGroup } from "react-bootstrap";
import httpStatus from "http-status-codes";
import { GridLoader as Loader } from "halogen";
import Alerts from "../utils/Alerts";
import LoginForm from "../presentation/LoginComponent";

import { authenticatedFetch, checkFetchResponse } from "../../functions/fetch";
import { addReservedContexts } from "../../redux/action creators/reserved";

import "styles/app.scss";
import "styles/login.scss";
import "styles/utils.scss";

const ZERO_INDEX = 0;
const NO_ELEMENTS = 0;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            inProgress: false,
            password: ''
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.closePreviousErrors();
        this.componentIsMounted = false;
    }

    closePreviousErrors() {
        this.state.errors.forEach((error) => {
            Alert.close(error);
        });

        if (this.componentIsMounted) {
            this.setState({ errors: [] });
        }
    }

    handleError(error) {
        this.closePreviousErrors();
        if (!this.componentIsMounted) {
            return;
        }

        const { message } = error;
        const currentError = Alerts.createErrorAlert(message);
        this.setState({
            errors: [currentError],
            inProgress: false
        });
    }

    loginPopup(provider) {
        const { inProgress } = this.state;
        if (inProgress || !this.componentIsMounted) {
            return;
        }

        this.setState({ inProgress: true });
        nProgress.start();

        firebase.auth().signInWithPopup(provider).
        then((userRecord) => {
            const { uid } = userRecord.user;

            return fetch('/api/user/unauth/register-by-provider', {
                body: JSON.stringify({ uid }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).
            then((response) => {
                if (!this.componentIsMounted) {
                    return null;
                }

                const { status } = response;
                if (status >= httpStatus.BAD_REQUEST) {
                    Alerts.createWarningAlert('Failure in registering user in database. Available features are limited. Please, try to login again later.');
                }

                return null;
            });
        }).
        then(this.handleUserTypeFetch.bind(this)).
        then(() => {
            this.props.router.push('/');
            if (this.componentIsMounted) {
                this.setState({ inProgress: false });
            }
        }).
        catch((error) => {
            this.handleError(error);
        }).
        then(() => {
            nProgress.done();
        });
    }

    loginUser(email, password) {
        const { inProgress } = this.state;

        if (inProgress || !this.componentIsMounted) {
            return;
        }

        this.setState({ inProgress: true });
        nProgress.start();

        firebase.auth().signInWithEmailAndPassword(email, password).
        then(this.handleUserTypeFetch.bind(this)).
        then(() => {
            this.props.router.push('/');
            if (this.componentIsMounted) {
                this.setState({ inProgress: false });
            }
        }).
        catch((error) => {
            this.handleError(error);
        }).
        then(() => {
            nProgress.done();
        });
    }

    handleUserTypeFetch() {
        return authenticatedFetch('/api/reserved/user-type', {}, { 'Accept': 'application/json' }, 'GET').
        then(checkFetchResponse).
        then((contexts) => {
            let index = null;
            if (Array.isArray(contexts) && contexts.length > NO_ELEMENTS) {
                index = ZERO_INDEX;
            }
            this.context.store.dispatch(addReservedContexts(contexts, index));
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

    handleRegister() {
        this.props.router.push('/user/register');
    }

    handleForgotPassword() {
        this.props.router.push('/user/recover');
    }

    render() {
        const { inProgress } = this.state;

        let signInInProgress = null;
        if (inProgress) {
            signInInProgress =
                <FormGroup className="hor-align vert-align">
                    <h1 className="loader-text">Signing in progress...</h1>
                    <Loader color="#012935" className="loader"/>
                </FormGroup>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Sign in</title>
                </Helmet>

                <LoginForm disableButtons={inProgress}
                           handleRegister={ this.handleRegister.bind(this) }
                           handleForgotPassword={ this.handleForgotPassword.bind(this) }
                           handleLogin={this.loginUser.bind(this)}
                           handleFacebook={this.loginFacebook.bind(this)}
                           handleGoogle={this.loginGoogle.bind(this)} />

                { signInInProgress }
            </div>
        );
    }
}

Login.propTypes = { router: PropTypes.object.isRequired };

// To access Redux store
Login.contextTypes = { store: PropTypes.object };
