import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AppShell extends Component {

    render() {
        return (
            <span>{this.props.children}</span>
        );
    }
}

AppShell.propTypes = { children: PropTypes.object };
