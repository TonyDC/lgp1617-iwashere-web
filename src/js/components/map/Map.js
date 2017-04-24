import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Alerts from '../utils/Alerts';
import { blue500 as POIColor, red500 as currentLocationColor } from 'material-ui/styles/colors';

import Pin from './Pin';

import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';

import 'styles/utils.scss';
import 'styles/map.scss';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = { location: { present: false } };
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
                location: {
                    lat: latitude,
                    lng: longitude,
                    present: true
                }
            });

            this.map.setCenter({
                lat: latitude,
                lng: longitude
            });

            Alerts.closeAll();
        }, () => {
            Alerts.closeAll();
            Alerts.createErrorAlert('Error while retrieving current location.');

            this.setState({ location: { present: false } });
        }, geoOptions);

    }

    onGoogleAPILoaded({ map, maps }) {
        this.map = map;
        this.maps = maps;

        map.addListener('tilesloaded', () => {
            this.fetchPoints(map.getBounds());
        });

        this.handleLocation();
    }

    fetchPoints(borders) {
        const { b, f } = borders;
        const currentMaxLat = f.b,
            currentMaxLng = b.f,
            currentMinLat = f.f,
            currentMinLng = b.b;

        if (typeof this.state.response === 'object') {
            const { maxLat, maxLng, minLat, minLng } = this.state.response.area;

            if (currentMinLat >= minLat && currentMaxLat <= maxLat && currentMinLng >= minLng && currentMaxLng <= maxLng) {
                console.log('In cache');

                return;
            }
        }

        console.log('Fetching...');

        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).then((response) => {
            return response.json();
        }).
        then((response) => {
            this.setState({
                response: {
                    area: {
                        maxLat: currentMaxLat,
                        maxLng: currentMaxLng,
                        minLat: currentMinLat,
                        minLng: currentMinLng
                    },
                    content: response
                }
            });
        });
    }

    render() {
        const { lat, lng } = this.state.location;

        let currentLocation = null;
        if (this.state.location.present) {
            currentLocation =
                <Pin lat={lat} lng={lng}>
                    <div className="pin">
                        <IconButton>
                            <MapsMyLocation color={ currentLocationColor }/>
                        </IconButton>
                    </div>
                </Pin>;
        }

        const poisInViewport = this.state.response
            ? this.state.response.content.map((element, index) => {
                return <Pin lat={element.latitude} lng={element.longitude} key={index}>
                    <div className="pin">
                        <IconButton>
                            <CommunicationLocationOn color={ POIColor }/>
                        </IconButton>
                    </div>
                </Pin>;
            })
            : null;

        return (
            <GoogleMapReact defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            bootstrapURLKeys={{key: "AIzaSyDifdID6peJ__zQ6cKA1KxPm0hSuevf6-w"}}
                            onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }>
                { currentLocation }
                { poisInViewport }
            </GoogleMapReact>
        );
    }
}

Map.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    zoom: 17
};

Map.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    zoom: PropTypes.number
};
