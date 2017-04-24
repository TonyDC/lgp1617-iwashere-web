import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class POIRoutes extends Component {

    render() {
        return (
            <div className="colorAccentSecondary wrapper-fill">
                { this.props.children }
            </div>
        );
    }
}

POIRoutes.propTypes = { children: PropTypes.object.isRequired };
