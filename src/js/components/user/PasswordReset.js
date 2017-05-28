import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Helmet } from 'react-helmet';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import { GridLoader as Loader } from 'halogen';
import TextField from 'material-ui/TextField';

import Alerts from '../utils/Alerts';

import 'styles/app.scss';
import 'styles/login.scss';
import 'styles/utils.scss';

export default class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: null,
            inProgress: false
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    checkForm() {
        const { email } = this.state;

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            this.setState({ error: "The email entered is not valid." });

            return false;
        }

        return true;
    }

    sendPasswordResetEmail(event) {
        event.preventDefault();

        if (this.componentIsMounted && this.checkForm()) {
            this.setState({ inProgress: true });

            const { email } = this.state;
            firebase.auth().sendPasswordResetEmail(email).
            then(() => {
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    this.props.router.push('/user/login');
                    Alerts.createInfoAlert(`An email with a token has been sent to ${email}.`);
                }
            }).
            catch((error) => {
                if (this.componentIsMounted) {
                    this.setState({
                        error: error.message,
                        inProgress: false
                    });
                }
            });
        }
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            error: null
        });
    }

    render() {
        let resetInProgress = null;
        let resetForm = null;

        if (this.state.inProgress) {
            resetInProgress =
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>;
        } else {
            resetForm =
                <form onSubmit={this.sendPasswordResetEmail.bind(this)} className="form-group">
                    <TextField errorText={this.state.error}
                               hintText="Enter your email..."
                               floatingLabelText="Email"
                               fullWidth
                               value={this.state.email} onChange={ this.handleEmail.bind(this) } />
                    <div className="button-container">
                        <RaisedButton type="submit"
                                      label="Reset"
                                      primary
                                      className="login-button"
                                      onTouchTap={this.sendPasswordResetEmail.bind(this)}
                                      disabled={this.state.inProgress} />
                    </div>
                </form>;
        }

        return (
            <div>
                <Helmet>
                    <title>#iwashere - Reset Password</title>
                </Helmet>

                <div>
                    <h1 className="form-title">Reset Password</h1>
                </div>

                {resetInProgress}

                {resetForm}
            </div>
        );
    }
}

PasswordReset.propTypes = { router: PropTypes.object.isRequired };
