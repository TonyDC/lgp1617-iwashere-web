import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RouteRoutes extends Component {

    render() {
        return (
            <div className="colorAccentSecondary wrapper-fill">
                { this.props.children }
            </div>
        );
    }
}

RouteRoutes.propTypes = { children: PropTypes.object.isRequired };
