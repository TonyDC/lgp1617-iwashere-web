import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500, white } from 'material-ui/styles/colors';
import SocialPerson from 'material-ui/svg-icons/social/person';
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
        clear: 'both',
        paddingBottom: 10,
        paddingTop: 15,
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

const MINIMUM_PASSWORD_SIZE = 6;

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmPassword: '',
            confirmPasswordError: null,
            email: '',
            emailError: null,
            password: '',
            passwordError: null,
            username: '',
            usernameError: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleUsername(event) {
        event.preventDefault();
        this.setState({
            username: event.target.value,
            usernameError: null
        });
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

    handleConfirmPassword(event) {
        event.preventDefault();
        this.setState({
            confirmPassword: event.target.value,
            confirmPasswordError: null
        });
    }

    checkForm() {
        let error = false;
        let { email, username } = this.state;
        const { password, confirmPassword } = this.state;
        if (typeof email !== 'string') {
            this.setState({ emailError: 'Bad email' });
            error = true;
        }

        if (typeof username !== 'string') {
            this.setState({ usernameError: 'Bad username' });
            error = true;
        }

        if (!error) {
            email = email.trim();
            if (validator.isEmpty(email) || !validator.isEmail(email)) {
                this.setState({
                    email,
                    emailError: 'Bad email'
                });
                error = true;
            }

            username = username.trim();
            if (validator.isEmpty(username)) {
                this.setState({
                    username,
                    usernameError: 'Bad username'
                });
                error = true;
            }
        }

        if (typeof password !== 'string' || validator.isEmpty(password)) {
            this.setState({ passwordError: 'Bad password' });
            error = true;
        } else if (password.length < MINIMUM_PASSWORD_SIZE) {
            this.setState({ passwordError: 'Weak password. Please, choose a stronger one' });
            error = true;
        }

        if (typeof confirmPassword !== 'string' || confirmPassword !== password) {
            this.setState({ confirmPasswordError: 'The password do not match' });
            error = true;
        }

        return !error;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.checkForm()) {
            const { handleRegister } = this.props;
            const { username, email, password, confirmPassword } = this.state;
            if (typeof handleRegister === 'function') {
                handleRegister(username, email, password, confirmPassword);
            }
        }
    }

    renderRegisterButton() {
        const { disableButtons, handleRegister } = this.props;
        if (typeof handleRegister === 'function') {
            return (
                <RaisedButton type="submit"
                              label="Register"
                              primary
                              style={styles.loginBtn}
                              disabled={disableButtons}/>
            );
        }

        return null;
    }

    renderAlreadyRegisteredButton() {
        const { disableButtons, handleAlreadyRegistered } = this.props;
        if (typeof handleAlreadyRegistered === 'function') {
            return (
                <FlatButton label="Already Registered?"
                            fullWidth
                            style={styles.flatButton}
                            icon={<SocialPerson/>}
                            onTouchTap={handleAlreadyRegistered}
                            disabled={disableButtons}/>
            );
        }

        return null;
    }

    render() {
        const { username, usernameError, email, emailError, password, passwordError, confirmPassword, confirmPasswordError } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <TextField errorText={usernameError}
                               hintText="Enter your username"
                               floatingLabelText="Username"
                               fullWidth
                               value={username} onChange={ this.handleUsername.bind(this) } />
                    <TextField errorText={emailError}
                               hintText="Enter your e-mail"
                               floatingLabelText="E-mail"
                               fullWidth
                               value={email} onChange={ this.handleEmail.bind(this) } />
                    <TextField errorText={passwordError}
                               hintText="Enter your password"
                               floatingLabelText="Password"
                               fullWidth
                               type="password"
                               value={password} onChange={ this.handlePassword.bind(this) } />
                    <TextField errorText={confirmPasswordError}
                               hintText="Confirm the password"
                               floatingLabelText="Confirm Password"
                               fullWidth
                               type="password"
                               value={confirmPassword} onChange={ this.handleConfirmPassword.bind(this) } />
                    <div style={styles.buttonsDiv}>
                        { this.renderRegisterButton() }
                    </div>
                </form>

                <div style={styles.buttonsDiv}>
                    { this.renderAlreadyRegisteredButton() }
                </div>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    disableButtons: PropTypes.bool,
    handleAlreadyRegistered: PropTypes.func,
    handleRegister: PropTypes.func
};
