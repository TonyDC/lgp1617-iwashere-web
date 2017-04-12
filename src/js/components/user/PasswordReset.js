import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

import validator from 'validator';

import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

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
            this.props.router.push('/login');
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
            <div>
                <Helmet>
                    <title>#iwashere - Reset Password</title>
                </Helmet>

                <div>
                    <h1 className="form-title">Reset Password</h1>
                    <hr/>
                </div>

                <Form horizontal onSubmit={ this.sendPasswordResetEmail.bind(this) }>
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
                        <Button type="submit"
                                className="btn-primary btn-md btn-block login-button colorAccent"
                                onClick={ this.sendPasswordResetEmail.bind(this) }>
                            Send email
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

PasswordReset.propTypes = { router: PropTypes.object.isRequired };
