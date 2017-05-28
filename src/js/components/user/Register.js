import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import httpCodes from 'http-status-codes';
import { Helmet } from 'react-helmet';
import firebase from 'firebase';

import RegisterForm from './RegisterForm';
import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            inProgress: false
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    closePreviousErrors() {
        this.state.errors.forEach((error) => {
            Alerts.close(error);
        });

        this.setState({ errors: [] });
    }

    handleError(message) {
        if (!this.componentIsMounted) {
            return;
        }

        const { errors } = this.state;

        const currentError = Alerts.createErrorAlert(message);
        errors.push(currentError);
        this.setState({ errors });
    }

    registerUser(username, email, password, confirmPassword) {
        this.closePreviousErrors();
        const { inProgress } = this.state;

        if (inProgress || !this.componentIsMounted) {
            return;
        }

        this.setState({ inProgress: true });
        nProgress.start();

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
            const { status, statusText } = response;
            if (status >= httpCodes.BAD_REQUEST) {
                const error = new Error(statusText);
                error.code = status;
                error.message = statusText;

                return Promise.reject(error);
            }

            return response.json();
        }).
        then((response) => {
            if (!response.ok) {
                const error = new Error('Bad request');
                error.code = response.error.status;
                error.message = response.error.message;

                return Promise.reject(error);
            }

            return firebase.auth().signInWithEmailAndPassword(email, password);
        }).
        then((currentUser) => {
            if (currentUser && !currentUser.emailVerified) {
                return currentUser.sendEmailVerification().
                catch(() => {
                    this.handleError('Error sending confirmation email');
                });
            }

            return true;
        }).
        then((withoutEmail) => {
            if (!withoutEmail) {
                const { currentUser } = firebase.auth();
                Alerts.createInfoAlert(`A verification email has been sent to ${currentUser.email}.`);
            }
            this.props.router.push('/');
        }).
        catch((error) => {
            const { message } = error;
            this.handleError(message);
        }).
        then(() => {
            nProgress.done();
            if (this.componentIsMounted) {
                this.setState({ inProgress: false });
            }
        });
    }

    handleAlreadyRegistered(event) {
        event.preventDefault();
        this.props.router.push('/user/login');
    }

    render() {
        const { inProgress } = this.state;

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Sign up</title>
                </Helmet>

                <RegisterForm
                    disableButtons={inProgress}
                    handleRegister={this.registerUser.bind(this)}
                    handleAlreadyRegistered={this.handleAlreadyRegistered.bind(this)}
                />
            </div>
        );
    }
}

Register.propTypes = { router: PropTypes.object.isRequired };
