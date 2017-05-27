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
import Search from './components/search/Search';
import Feed from './components/feed/Feed';
import POICreatePost from './components/poi/POICreatePost';

import UnauthRoutes from './routes/UnauthRoutes';
import POIRoutes from './routes/POIRoutes';
import RouteRoutes from './routes/RouteRoutes';

import POIArea from './components/reserved/admin/poi/POIArea';
import CreatePOI from './components/reserved/admin/poi/CreatePOI';
import EditPOI from './components/reserved/admin/poi/EditPOI';
import RouteArea from './components/reserved/admin/routes/RouteArea';
import CreateRoute from './components/reserved/admin/routes/CreateRoute';
import EditRoute from './components/reserved/admin/routes/EditRoute';
import UserArea from './components/reserved/admin/users/UserArea';
import CreateUser from './components/reserved/admin/users/CreateUser';
import EditUser from './components/reserved/admin/users/EditUser';

import Alerts from './components/utils/Alerts';

import { loginActionCreator, logoutActionCreator } from './redux/action creators/login';

import 'styles/app.scss';

const NO_ELEMENTS = 0;

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
        // TODO set initial container state
        this.firebaseObserverUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.auth().currentUser.getToken().then((token) => console.log(token));
                this.context.store.dispatch(loginActionCreator(user));
            } else {
                this.context.store.dispatch(logoutActionCreator());
            }
        });
    }

    redirectIfLoggedIn(nextState, replace) {
        const { currentUser } = firebase.auth();
        // { pathname: '/', state: <anyState> }
        if (currentUser) {
            replace({ pathname: '/' });
        }
    }

    redirectIfReservedNotLoggedIn(nextState, replace) {
        const reduxState = this.context.store.getState();
        const { reserved } = reduxState;
        const { contexts } = reserved;
        if (!Array.isArray(contexts) || contexts.length === NO_ELEMENTS) {
            replace({ pathname: '/' });
            Alerts.createErrorAlert('User without enough permissions');
        }
    }

    render() {
        return (
            <Router history={ browserHistory }>
                <Route path="/" component={ MainRoutes }>
                    <IndexRoute component={ Map } />
                    <Route path="search" component={ Search }/>
                    <Route path="feed" component={ Feed }/>
                    <Route path="poi" component={ POIRoutes }>
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
                    <Route path="reserved" onEnter={ this.redirectIfReservedNotLoggedIn.bind(this) }>
                        <Route path="dash" component={ AdminShell }>
                            <IndexRedirect to="poi" />
                            <Route path="poi">
                                <IndexRoute component={ POIArea } />
                                <Route path="create" component={ CreatePOI } />
                                <Route path=":poiID" component={ EditPOI } />
                            </Route>
                            <Route path="route">
                                <IndexRoute component={ RouteArea } />
                                <Route path="create" component={ CreateRoute } />
                                <Route path=":id" component={ EditRoute } />
                            </Route>
                            <Route path="user">
                                <IndexRoute component={ UserArea } />
                                <Route path="create" component={ CreateUser } />
                                <Route path=":id" component={ EditUser } />
                            </Route>
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
