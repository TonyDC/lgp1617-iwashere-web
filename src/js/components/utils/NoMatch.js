import React, { Component } from 'react';

import logo from 'img/logo.svg';

export default class NoMatch extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img alt="logo" className="App-logo" src={logo} />
                    <h2>Oops!</h2>
                    <h5>The page you were looking for could not be found...</h5>
                </div>
            </div>
        );
    }
}
