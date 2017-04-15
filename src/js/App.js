/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import * as firebase from 'firebase';

import MainRoutes from './routes/MainRoutes';

import NoMatch from './components/utils/NoMatch';

import Map from './components/map/Map';
import Login from './components/user/Login';
import Register from './components/user/Register';
import PasswordReset from './components/user/PasswordReset';
import POIDetail from './components/poi/POIDetail';

import UnauthRoutes from './routes/UnauthRoutes';

import { loginActionCreator, logoutActionCreator } from './redux/action creators/login';

import 'styles/app.scss';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.hookListeners();
    }

    componentWillUnmount() {
        this.firebaseObserverUnsubscriber();
    }

    hookListeners() {
        this.firebaseObserverUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.context.store.dispatch(loginActionCreator(user));
            } else {
                this.context.store.dispatch(logoutActionCreator());
            }
        });
    }

    redirectIfLoggedIn(nextState, replace) {
        const currentState = this.context.store.getState();
        if (currentState.userStatus.isLogged) {
            replace({ pathname: '/' });
        }
    }

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MainRoutes }>
                    <IndexRoute component={ Map } />
                    <Route path="user" component={ UnauthRoutes }>
                        <Route path="login" component={ Login } onEnter={ this.redirectIfLoggedIn.bind(this) } />
                        <Route path="register" component={ Register } onEnter={ this.redirectIfLoggedIn.bind(this) } />
                        <Route path="recover" component={ PasswordReset } onEnter={ this.redirectIfLoggedIn.bind(this) } />
                        <Route path="recover" component={ POIDetail } />
                    </Route>
                    <Route path="*" component={ NoMatch }/>
                </Route>
            </Router>
        );
    }
}

// To access Redux store
App.contextTypes = { store: PropTypes.object };
