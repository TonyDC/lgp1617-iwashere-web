/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from 'react-s-alert';
import NoMatch from './utils/NoMatch';
import NavBar from './utils/NavBar';

import Map from './map/Map';

import UserLogin from './user/Login';
import UserRegister from './user/Register';
import UserPasswordReset from './user/PassowrdReset';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


import 'styles/app.scss';

export default class App extends Component {

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

                    <Alert stack={{limit: 30}} />
                </div>
            </Router>
        );
    }
}
