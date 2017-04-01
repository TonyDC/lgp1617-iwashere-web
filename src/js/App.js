import React, { Component } from 'react';
import logo from 'img/logo.svg';
import 'styles/app.scss';
import { Button } from 'react-bootstrap';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img alt="logo" className="App-logo" src={logo} />
                    <h2>React Test Page</h2>
                    <h5>This is a page</h5>
                    <Button>I am a button</Button>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}
