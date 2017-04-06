import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';

import 'styles/utils.scss';

export default class Map extends Component {

    render() {
        return (
            // apiKey prop
            <div className="fullscreen">
                <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                    <Pin lat={41.14792237} lng={-8.61129427} text="Hello!">
                        <button>asfasfds</button>
                    </Pin>
                </GoogleMapReact>
            </div>
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
