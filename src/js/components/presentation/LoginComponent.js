import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Alerts from '../utils/Alerts';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';

import validator from 'validator';

const styles = {
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    paper: {
        padding: 20,
        overflow: 'auto'
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10
    },
    flatButton: {
        color: grey500
    },
    checkRemember: {
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
        },
        labelStyle: {
            color: grey500
        },
        iconStyle: {
            color: grey500,
            borderColor: grey500,
            fill: grey500
        }
    },
    loginBtn: {
        float: 'right'
    },
    btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
    },
    btnFacebook: {
        background: '#4f81e9'
    },
    btnGoogle: {
        background: '#e14441'
    },
    btnDisabled: {
        background: '#7d7d7d'
    },
    btnSpan: {
        marginLeft: 5
    },
};

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: null,
            password: '',
            passwordError: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            emailError: null
        });
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({
            password: event.target.value,
            passwordError: null
        });
    }

    checkForm() {
        let error = false;
        let { email } = this.state;
        const { password } = this.state;
        if (typeof email !== 'string') {
            this.setState({ emailError: 'Bad email' });
            error = true;
        }

        if (!error) {
            email = email.trim();
            if (validator.isEmpty(email) || !validator.isEmail(email)) {
                this.setState({ emailError: 'Bad email' });
                error = true;
            }
        }

        if (typeof password !== 'string' || validator.isEmpty(password)) {
            this.setState({ passwordError: 'Bad password' });
            error = true;
        }

        return error;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.checkForm()) {
            return;
        }

        const { handleLogin } = this.props;
        const { email, password } = this.state;
        if (typeof handleLogin === 'function') {
            handleLogin(email, password);
        }
    }

    renderLoginButton() {
        const { disableButtons, handleFacebook, handleGoogle, handleLogin, handleRegister, handleForgotPassword } = this.props;
        if (typeof handleLogin !== 'function') {
            return null;
        }

        return (
            <RaisedButton type="submit"
                          label="Login"
                          primary
                          style={styles.loginBtn}
                          disabled={disableButtons}
            />
        );
    }

    renderRegisterButton() {
        const { disableButtons, handleFacebook, handleGoogle, handleLogin, handleRegister, handleForgotPassword } = this.props;
        if (typeof handleRegister !== 'function') {
            return null;
        }

        const { email, password } = this.state;

        return (
            <FlatButton
                label="Register"
                style={styles.flatButton}
                icon={<PersonAdd />}
                onTouchTap={handleRegister}
                disabled={disableButtons}
            />
        );
    }

    renderForgotPasswordButton() {
        const { disableButtons, handleFacebook, handleGoogle, handleLogin, handleRegister, handleForgotPassword } = this.props;
        if (typeof handleForgotPassword !== 'function') {
            return null;
        }

        return (
            <FlatButton
                label="Forgot Password?"
                style={styles.flatButton}
                icon={<Help />}
                onTouchTap={ handleForgotPassword }
                disabled={disableButtons}
            />
        );
    }

    renderFacebookButton() {
        const { disableButtons, handleFacebook, handleGoogle, handleLogin, handleRegister, handleForgotPassword } = this.props;
        if (typeof handleFacebook !== 'function') {
            return null;
        }

        let effectiveButtonStyle = { ...styles.btn };
        if (disableButtons) {
            effectiveButtonStyle = {
                ...effectiveButtonStyle,
                ...styles.btnDisabled
            };
        } else {
            effectiveButtonStyle = {
                ...effectiveButtonStyle,
                ...styles.btnFacebook
            };
        }

        return (
            <FlatButton onTouchTap={handleFacebook} disabled={disableButtons}>
                <span style={effectiveButtonStyle}>
                    <i className="fa fa-facebook fa-lg"/>
                    <span style={styles.btnSpan}>Log in with Facebook</span>
                </span>
            </FlatButton>
        );
    }

    renderGoogleButton() {
        const { disableButtons, handleFacebook, handleGoogle, handleLogin, handleRegister, handleForgotPassword } = this.props;
        if (typeof handleGoogle !== 'function') {
            return null;
        }

        let effectiveButtonStyle = { ...styles.btn };
        if (disableButtons) {
            effectiveButtonStyle = {
                ...effectiveButtonStyle,
                ...styles.btnDisabled
            };
        } else {
            effectiveButtonStyle = {
                ...effectiveButtonStyle,
                ...styles.btnGoogle
            };
        }


        return (
            <FlatButton onTouchTap={handleGoogle} disabled={disableButtons}>
                <span style={effectiveButtonStyle}>
                <i className="fa fa-google-plus fa-lg"/>
                <span style={styles.btnSpan}>Log in with Google</span>
                </span>
            </FlatButton>
        );
    }

    render() {
        const { email, emailError, password, passwordError } = this.state;

        return (
            <div style={styles.loginContainer}>
                <Paper style={styles.paper}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <TextField
                            errorText={emailError}
                            hintText="E-mail"
                            floatingLabelText="E-mail"
                            fullWidth
                            value={email} onChange={ this.handleEmail.bind(this) }
                        />
                        <TextField
                            errorText={passwordError}
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth
                            type="password"
                            value={password} onChange={ this.handlePassword.bind(this) }
                        />

                        <div>
                            { this.renderLoginButton() }
                        </div>
                    </form>
                </Paper>

                <div style={styles.buttonsDiv}>
                    { this.renderRegisterButton() }
                    { this.renderForgotPasswordButton() }
                </div>

                <div style={styles.buttonsDiv}>
                    { this.renderFacebookButton() }
                    { this.renderGoogleButton() }
                </div>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    disableButtons: PropTypes.bool,
    handleFacebook: PropTypes.func,
    handleForgotPassword: PropTypes.func,
    handleGoogle: PropTypes.func,
    handleLogin: PropTypes.func,
    handleRegister: PropTypes.func
};
