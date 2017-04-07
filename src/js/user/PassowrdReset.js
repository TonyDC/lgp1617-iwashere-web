import React, { Component } from 'react';
import Alert from 'react-s-alert';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { BAD_REQUEST } from 'http-status-codes';
const validator = require('validator');

import 'styles/login.scss';
import 'styles/utils.scss';

export default class PassowrdReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            loggedIn: firebase.auth().currentUser !== null
        };
    }

    closePreviousErrors() {
        this.state.errors.forEach((error) => {
            Alert.close(error);
        });

        this.setState({ errors: [] });
    }

    componentWillUnmount() {
        this.closePreviousErrors();
    }

    handleError(error) {
        const { code, message } = error;
        console.error(code, message);

        this.closePreviousErrors();

        const currentError = Alert.error(message, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });

        this.setState({
            errors: [currentError],
            loggedIn: false
        });
    }

    checkForm() {
        const { email } = this.state;

        if (typeof email !== 'string' || !email || validator.isEmpty(email.trim()) || !validator.isEmail(email)) {
            this.handleError({message: "The email entered is not valid."});

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
            Alert.info(`An email with a token has been sent to ${email}.`, {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 5000
            });

            this.props.history.push('/login');
        }).
        catch((error) => {
            this.handleError(error);
        });
    }

    handleEmail(event) {
        event.preventDefault();
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>#iwashere - Reset password</title>
                </Helmet>
                <div className="container">
                    <div className="row main">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1>Reset password</h1>
                                <hr/>
                            </div>
                        </div>

                        <div className="main-center">
                            <form className="form-horizontal" onSubmit={ this.sendPasswordResetEmail.bind(this) }>
                                <div className="form-group">
                                    <label htmlFor="email" className="cols-sm-2 control-label">Your email</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your Email" onChange={ this.handleEmail.bind(this) }/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group ">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block login-button" onClick={ this.sendPasswordResetEmail.bind(this) }>Send email</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
