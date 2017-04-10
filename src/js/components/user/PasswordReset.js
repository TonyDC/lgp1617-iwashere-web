import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

import validator from 'validator';

import Alerts from '../utils/Alerts';

import logo from 'img/logo.png';

import 'styles/login.scss';
import 'styles/utils.scss';

export default class PasswordReset extends Component {

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

        const currentError = Alerts.createErrorAlert(message);
        this.setState({
            errors: [currentError],
            loggedIn: false
        });
    }

    checkForm() {
        const { email } = this.state;

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            this.handleError({ message: "The email entered is not valid." });

            return false;
        }

        return true;
    }

    sendPasswordResetEmail(event) {
        event.preventDefault();

        if (!this.checkForm()) {
            return;
        }

        const { email } = this.state;
        firebase.auth().sendPasswordResetEmail(email).
        then(() => {
            Alerts.createInfoAlert(`An email with a token has been sent to ${email}.`);
            this.props.history.push('/login');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }

    render() {
        return (
            <Form horizontal onSubmit={ this.sendPasswordResetEmail.bind(this) }>
                <FormGroup>
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
                    <Button type="submit"
                            className="btn-primary btn-md btn-block login-button colorAccent"
                            onClick={ this.sendPasswordResetEmail.bind(this) }>
                        Sign In
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

PasswordReset.propTypes = { history: PropTypes.object };
