import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GridLoader as Loader } from 'halogen';

import UserLogin from '../components/user/Login';
import UserRegister from '../components/user/Register';
import UserPasswordReset from '../components/user/PasswordReset';

import logo from 'img/logo.png';

import 'styles/login.scss';
import 'styles/utils.scss';

export default class UnauthRoutes extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = { userStatus: reduxState.userStatus };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            this.setState({ userStatus: reduxState.userStatus });
        });
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
    }

    render() {
        const { userStatus } = this.state;
        if (typeof userStatus.isLogged === 'undefined') {
            return <div className="hor-align">
                <Loader color="#E5402A" size="50px" margin="10px"/>
            </div>;

        } else if (userStatus.isLogged) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="colorAccentSecondary">
                <div className="container">
                    <div className="row main">
                        <div className="main-login main-center">
                            <div className="panel-heading">
                                <div className="panel-title text-center">
                                    <img src={logo} alt="#iwashere logo"/>
                                </div>
                            </div>

                            <Switch>
                                <Route path="/login" component={ UserLogin } />
                                <Route path="/register" component={ UserRegister }/>
                                <Route path="/password-reset" component={ UserPasswordReset }/>
                            </Switch>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// To access Redux store
UnauthRoutes.contextTypes = { store: PropTypes.object };
