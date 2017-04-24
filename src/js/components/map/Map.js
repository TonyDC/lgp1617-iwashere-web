import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Alerts from '../utils/Alerts';

import Pin from './Pin';

import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

import 'styles/utils.scss';
import 'styles/map.scss';

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

        Alerts.createInfoAlert(`Retrieving location...`);
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.setState({
                lat: latitude,
                lng: longitude,
                location: true
            });

            this.map.setCenter({
                lat: latitude,
                lng: longitude
            });

        }, () => {
            Alerts.closeAll();
            Alerts.createErrorAlert('Error while retrieving current location.');
        }, geoOptions);

    }

    onGoogleAPILoaded({ map, maps }) {
        this.map = map;
        this.maps = maps;

        map.addListener('dragend', () => {
            this.fetchPoints(map.getBounds());
        });

        this.handleLocation();
    }

    fetchPoints(borders) {
        const { b, f } = borders;

        fetch(`/api/poi/range/${f.f}/${f.b}/${b.b}/${b.f}`).then((response) => {
            return response.json();
        }).
        then((response) => {
            this.setState({ response });
        });
    }

    render() {
        const { lat, lng } = this.state;

        let currentLocation = null;
        if (this.state.location) {
            currentLocation =
                <Pin lat={lat} lng={lng}>
                    <div className="pin">
                        <IconButton>
                            <CommunicationLocationOn/>
                        </IconButton>
                    </div>
                </Pin>;
        }

        return (
            <GoogleMapReact defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            bootstrapURLKeys={{key: "AIzaSyDifdID6peJ__zQ6cKA1KxPm0hSuevf6-w"}}
                            onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }
            >
                { currentLocation }
                { this.state.response? this.state.response.map((element) => {
                    return <Pin lat={element.latitude} lng={element.longitude}>
                        <div className="pin">
                            <IconButton>
                                <CommunicationLocationOn/>
                            </IconButton>
                        </div>
                    </Pin>;
                }) : null }
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
