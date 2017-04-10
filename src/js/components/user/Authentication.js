/* To remove
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Helmet } from 'react-helmet';

import Alerts from '../utils/Alerts';

import 'styles/login.scss';
import 'styles/utils.scss';

import logo from 'img/logo.png';

import LoginForm from '../user/Login';
import Register from "./Register";
import PasswordReset from "./PasswordReset";

const NO_ERROR = 0;

export default class Authentication extends Component {

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

    render() {
        var authenticationForm;

        if(this.props.formType === 'login') {
            authenticationForm = <LoginForm/>
        }else if(this.props.formType === 'register') {
            authenticationForm = <Register/>
        }else if(this.props.formType === 'password-reset') {
            authenticationForm = <PasswordReset/>
        }
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
                            {authenticationForm}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Authentication.propTypes = { history: PropTypes.object };

// To access Redux store
Authentication.contextTypes = { store: PropTypes.object };
*/
