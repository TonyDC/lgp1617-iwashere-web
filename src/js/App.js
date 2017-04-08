/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase';

import Alerts from './components/utils/Alerts';
import NoMatch from './components/utils/NoMatch';
import NavBar from './components/utils/NavBar';

import Map from './components/map/Map';

import UserLogin from './components/user/Login';
import UserRegister from './components/user/Register';
import UserPasswordReset from './components/user/PasswordReset';

import { loginActionCreator, logoutActionCreator } from './redux/action creators/login';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

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

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={ NavBar }/>
                    <Switch>
                        <Route exact path="/" component={ Map }/>
                        <Route path="/login" component={ UserLogin } />
                        <Route path="/register" component={ UserRegister } />
                        <Route path="/password-reset" component={ UserPasswordReset } />
                        <Route component={ NoMatch }/>
                    </Switch>
                    <Alerts/>
                </div>
            </Router>
        );
    }
}

// To access Redux store
App.contextTypes = { store: React.PropTypes.object };
