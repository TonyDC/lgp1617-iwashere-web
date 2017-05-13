import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RouteTransition, presets } from 'react-router-transition';

import AdminNavigator from './AdminNavigator';

import 'styles/utils.scss';

export default class AdminShell extends Component {

    render() {
        return (
            <div className="wrapper-fill">
                <AdminNavigator router={this.props.router}/>
                <RouteTransition

                    pathname={this.props.location.pathname}
                    {...presets.pop}
                >
                    <div style={{position: 'absolute', width: '100%'}}>
                        {this.props.children}
                    </div>
                </RouteTransition>
            </div>
        );
    }
}

AdminShell.propTypes = {
    children: PropTypes.object,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};
