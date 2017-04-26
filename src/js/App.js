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
import POISearch from './components/poi/POISearch';
import POISuggestions from './components/poi/POISuggestions';

import UnauthRoutes from './routes/UnauthRoutes';
import POIRoutes from './routes/POIRoutes';

import { loginActionCreator, logoutActionCreator } from './redux/action creators/login';

import 'styles/app.scss';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};

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

    /*
     * Note:
     *  Firebase stores, in the local storage, information regarding the current logged in user.
     *  Since Firebase has a delay as to confirm the identity of the user, it is required if a user is already logged in. Hence, the usage of the local storage.
     */
    redirectIfLoggedIn(nextState, replace) {
        const currentState = this.context.store.getState();
        // { pathname: '/', state: <anyState> }
        const localStorageProperty = `firebase:authUser:${firebase.app().options.apiKey}:[DEFAULT]`;
        if (currentState.userStatus.isLogged || localStorage[localStorageProperty]) {
            replace({ pathname: '/' });
        }
    }

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MainRoutes }>
                    <IndexRoute component={ Map } />

                    <Route path="feed" component={ POISuggestions }/>

                    <Route path="poi" component={ POIRoutes }>
                        <Route path="search" component={ POISearch } />
                        <Route path=":id" component={ POIDetail } />
                    </Route>

                    <Route path="user" component={ UnauthRoutes } onEnter={ this.redirectIfLoggedIn.bind(this) }>
                        <Route path="login" component={ Login }/>
                        <Route path="register" component={ Register }/>
                        <Route path="recover" component={ PasswordReset }/>
                    </Route>
                    <Route path="*" component={ NoMatch }/>
                </Route>
            </Router>
        );
    }
}

// To access Redux store
App.contextTypes = { store: PropTypes.object };
