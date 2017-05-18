/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import * as firebase from 'firebase';

import AppShell from './components/utils/AppShell';
import AdminShell from './components/utils/AdminShell';

import MainRoutes from './routes/MainRoutes';

import NoMatch from './components/utils/NoMatch';

import Map from './components/map/Map';
import Login from './components/user/Login';
import Register from './components/user/Register';
import PasswordReset from './components/user/PasswordReset';
import POIDetail from './components/poi/POIDetail';
import RouteDetail from './components/route/RouteDetail';
import POISearch from './components/poi/POISearch';
import Feed from './components/feed/Feed';
import POICreatePost from './components/poi/POICreatePost';

import UnauthRoutes from './routes/UnauthRoutes';
import POIRoutes from './routes/POIRoutes';
import RouteRoutes from './routes/RouteRoutes';

import AdminLogin from './components/reserved/AdminLogin';
import AdminDashboard from './components/reserved/admin/poi/POIComponent';
import CreateRoute from './components/reserved/admin/routes/CreateRoute';
import EditRoute from './components/reserved/admin/routes/EditRoute';

import Alerts from './components/utils/Alerts';

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
                firebase.auth().currentUser.getToken(true).then((token) => console.log(token));
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

    redirectIfReservedLoggedIn(nextState, replace) {
        const currentState = this.context.store.getState();
        // { pathname: '/', state: <anyState> }
        const localStorageProperty = `firebase:authUser:${firebase.app().options.apiKey}:[DEFAULT]`;
        if ((currentState.userStatus.isLogged || localStorage[localStorageProperty]) && typeof localStorage.res === 'number') {
            replace({ pathname: '/reserved/dash' });
        }
    }

    redirectIfReservedNotLoggedIn(nextState, replace) {
        const currentState = this.context.store.getState();
        // { pathname: '/', state: <anyState> }
        const localStorageProperty = `firebase:authUser:${firebase.app().options.apiKey}:[DEFAULT]`;
        if ((!currentState.userStatus.isLogged && !localStorage[localStorageProperty]) || typeof localStorage.res !== 'number') {
            replace({ pathname: '/reserved' });
            Alerts.createErrorAlert('User without enough permissions');
        }
    }

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MainRoutes }>
                    <IndexRoute component={ Map } />
                    <Route path="feed" component={ Feed }/>
                    <Route path="poi" component={ POIRoutes }>
                        <Route path="search" component={ POISearch } />
                        <Route path=":id" component={ POIDetail } />
                        <Route path="post" component={ POICreatePost } />
                    </Route>
                    <Route path="route" component={ RouteRoutes }>
                        <Route path=":id" component={ RouteDetail } />
                    </Route>
                    <Route path="user" component={ UnauthRoutes } onEnter={ this.redirectIfLoggedIn.bind(this) }>
                        <Route path="login" component={ Login }/>
                        <Route path="register" component={ Register }/>
                        <Route path="recover" component={ PasswordReset }/>
                    </Route>
                    { /* TODO */ }
                    <Route path="reserved" component={ AppShell }>
                        <IndexRoute component={ AdminLogin } />
                        <Route path="dash" component={ AdminShell }>
                            <IndexRedirect to="poi" />
                            <Route path="poi" component={ AdminDashboard } />
                            <Route path="route" >
                                <Route path="create" component={ CreateRoute } />
                                <Route path=":id" component={ EditRoute } />
                            </Route>
                            <Route path="user" component={ AdminDashboard } />
                        </Route>
                    </Route>
                    <Route path="*" component={ NoMatch }/>
                </Route>
            </Router>
        );
    }
}

// To access Redux store
// Also, to 'pull' context from Jest tests
App.contextTypes = {
    muiTheme: PropTypes.object,
    store: PropTypes.object
};
