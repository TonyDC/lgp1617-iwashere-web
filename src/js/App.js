import React, { Component } from 'react';

import Card from 'js/Card';

import logo from 'img/logo.svg';
import 'styles/app.scss';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>React Test Page</h2>
                    <h5>This is a page</h5>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="App-content">
                    <Card header="Card header" footer="Card footer">
                        <div>Card content</div>
                    </Card>
                </div>
            </div>
        );
    }
}