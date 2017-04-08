import React, { Component } from 'react';

export default class AppShell extends Component {

    render() {
        return (
            <span>{this.props.children}</span>
        );
    }
}
