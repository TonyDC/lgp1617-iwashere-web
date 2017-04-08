import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';

import 'styles/utils.scss';

export default class Map extends Component {

    render() {
        return (
            // 'apiKey' prop
            <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                <Pin lat={41.14792237} lng={-8.61129427} text="Hello!">
                    <button>This is a button</button>
                </Pin>
            </GoogleMapReact>
        );
    }
}

Map.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    zoom: 8
};

Map.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    zoom: PropTypes.number
};
