import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';

const styles = {
    btn: {
        background: '#4f81e9',
        borderRadius: 2,
        color: white,
        fontSize: 13,
        margin: 2,
        padding: 7
    },
    btnDisabled: { background: '#7d7d7d' },
    btnFacebook: { background: '#4f81e9' },
    btnGoogle: { background: '#e14441' },
    btnSpan: { marginLeft: 5 },
    buttonsDiv: {
        padding: 10,
        textAlign: 'center'
    },
    checkRemember: {
        iconStyle: {
            borderColor: grey500,
            color: grey500,
            fill: grey500
        },
        labelStyle: { color: grey500 },
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
        }
    },
    flatButton: { color: grey500 },
    loginBtn: { float: 'right' },
    loginContainer: {
        height: 'auto',
        left: 0,
        margin: 'auto',
        maxWidth: 400,
        minWidth: 320,
        position: 'absolute',
        right: 0,
        top: '20%'
    },
    paper: {
        overflow: 'auto',
        padding: 20
    }
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

        return !error;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.checkForm()) {
            const { handleLogin } = this.props;
            const { email, password } = this.state;
            if (typeof handleLogin === 'function') {
                handleLogin(email, password);
            }
        }
    }

    renderLoginButton() {
        const { disableButtons, handleLogin } = this.props;
        if (typeof handleLogin === 'function') {
            return (
                <RaisedButton type="submit"
                              label="Login"
                              primary
                              style={styles.loginBtn}
                              disabled={disableButtons}/>
            );
        }

        return null;
    }

    renderRegisterButton() {
        const { disableButtons, handleRegister } = this.props;
        if (typeof handleRegister === 'function') {
            return (
                <FlatButton label="Register"
                            style={styles.flatButton}
                            icon={<PersonAdd />}
                            onTouchTap={handleRegister}
                            disabled={disableButtons}/>
            );
        }

        return null;
    }

    renderForgotPasswordButton() {
        const { disableButtons, handleForgotPassword } = this.props;
        if (typeof handleForgotPassword === 'function') {
            return (
                <FlatButton label="Forgot Password?"
                            style={styles.flatButton}
                            icon={<Help />}
                            onTouchTap={ handleForgotPassword }
                            disabled={disableButtons}/>
            );
        }

        return null;
    }

    renderFacebookButton() {
        const { disableButtons, handleFacebook } = this.props;
        if (typeof handleFacebook === 'function') {

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

        return null;
    }

    renderGoogleButton() {
        const { disableButtons, handleGoogle } = this.props;
        if (typeof handleGoogle === 'function') {
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

        return null;
    }

    render() {
        const { email, emailError, password, passwordError } = this.state;

        return (
            <div style={styles.loginContainer}>
                <Paper style={styles.paper}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <TextField errorText={emailError}
                                   hintText="E-mail"
                                   floatingLabelText="E-mail"
                                   fullWidth
                                   value={email} onChange={ this.handleEmail.bind(this) } />
                        <TextField errorText={passwordError}
                                   hintText="Password"
                                   floatingLabelText="Password"
                                   fullWidth
                                   type="password"
                                   value={password} onChange={ this.handlePassword.bind(this) } />
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
