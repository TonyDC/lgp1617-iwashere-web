import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { GridLoader as Loader } from 'halogen';

import validator from 'validator';

import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

export default class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: [],
            inProgress: false
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

        this.setState({ errors: [] });
    }

    handleError(error) {
        const { message } = error;

        this.closePreviousErrors();

        if (!this.componentIsMounted) {
            return;
        }

        const currentError = Alerts.createErrorAlert(message);
        this.setState({
            errors: [currentError],
            inProgress: false
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

        this.setState({ inProgress: true });

        const { email } = this.state;
        firebase.auth().sendPasswordResetEmail(email).
        then(() => {
            if (!this.componentIsMounted) {
                return;
            }

            Alerts.createInfoAlert(`An email with a token has been sent to ${email}.`);
            this.props.router.push('/user/login');
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
        let resetInProgress = null;
        let resetForm = null;

        if (this.state.inProgress) {
            resetInProgress =
                <FormGroup className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </FormGroup>;
        } else {
            resetForm =
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
                </Form>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Reset Password</title>
                </Helmet>

                <div>
                    <h1 className="form-title">Reset Password</h1>
                    <hr/>
                </div>

                {resetInProgress}

                {resetForm}
            </div>
        );
    }
}

PasswordReset.propTypes = { router: PropTypes.object.isRequired };
