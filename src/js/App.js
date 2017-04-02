/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NoMatch from './utils/NoMatch';

import Map from './map/Map';

import UserLogin from './user/Login';
import UserRegister from './user/Register';

import 'styles/app.scss';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ Map }/>
                    <Route path="/login" component={ UserLogin } />
                    <Route path="/register" component={ UserRegister } />
                    <Route component={ NoMatch }/>
                </Switch>
            </Router>
        );
    }
}
