import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Alerts from '../utils/Alerts';

import Pin from './Pin';

import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

import 'styles/utils.scss';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = { location: false };
    }

    handleLocation() {
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 20000
        };

        console.log('asofdiqweutfi');


            Alerts.createInfoAlert(`Retrieving location...`);
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    lat: latitude,
                    lng: longitude,
                    location: true
                });
            }, () => {
                Alerts.closeAll();
                Alerts.createErrorAlert('Error while retrieving current location.');
            }, geoOptions);

    }

    render() {
        const { lat, lng } = this.state;

        let currentLocation = null;
        let center = this.props.center;
        if (this.state.location) {
            currentLocation = <Pin lat={lat} lng={lng}>
                <CommunicationLocationOn/>
            </Pin>;

            center = {
                lat,
                lng
            };
        }

        return (
            <GoogleMapReact bootstrapURLKeys={{key: "AIzaSyDifdID6peJ__zQ6cKA1KxPm0hSuevf6-w"}}
                            center={center}
                            zoom={12}
                            minZoom={5}
                            onGoogleApiLoaded={() => {console.log('sadkjbals');}}
            >
                { currentLocation }
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
