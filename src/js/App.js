/* eslint react/jsx-sort-props: "off" */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NoMatch from './utils/NoMatch';
import NavBar from './utils/NavBar';

import Map from './map/Map';

import UserLogin from './user/Login';
import UserRegister from './user/Register';

import 'styles/app.scss';
import 'styles/utils.scss'

export default class App extends Component {

    render() {


        return (
            <Router>
                <div>
                    <Route path="/" component={ NavBar }/>

                    <div className="fullscreen">
                        <Switch>
                            <Route exact path="/" component={ Map }/>
                            <Route path="/login" render={() => {
                                if (false) {
                                    return <Redirect to={{pathname: '/'}}/>;
                                } else {
                                    return <UserLogin/>;
                                }
                            }}/>
                            <Route path="/register" component={ UserRegister } />
                            <Route component={ NoMatch }/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );

    }
}
