import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import { Form, FormGroup, InputGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import * as firebase from 'firebase';
import validator from 'validator';

import Alerts from '../utils/Alerts';

import 'styles/login.scss';
import 'styles/utils.scss';
import logo from 'img/logo.png';

export default class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.state = { errors: [] };
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
        this.setState({ errors: [currentError] });
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
            <div className="colorAccentSecondary">
                <Helmet>
                    <title>#iwashere - Reset password</title>
                </Helmet>

                <div className="container">
                    <div className="row main">
                        <div className="main-login main-center">
                            <div className="panel-heading">
                                <div className="panel-title text-center">
                                    <img src={logo} alt="#iwashere logo"/>
                                </div>
                            </div>

                            <div>
                                <h1 className="form-title">Reset password</h1>
                                <hr/>
                            </div>

                            <Form horizontal onSubmit={ this.sendPasswordResetEmail.bind(this) }>
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
                                    <Button type="submit"
                                            className="btn-primary btn-md btn-block login-button colorAccent"
                                            onClick={ this.sendPasswordResetEmail.bind(this) }>
                                        Send email
                                    </Button>
                                </FormGroup>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PasswordReset.propTypes = { history: PropTypes.object };
