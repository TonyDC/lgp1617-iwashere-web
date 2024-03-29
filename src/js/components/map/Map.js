import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import Alerts from '../utils/Alerts';
import httpCodes from 'http-status-codes';

import { GOOGLE_MAPS_API_KEY } from '../../../../config';
import POISideBar from '../poi/POISideBar';

import POIComponent from './Location';
import UserLocationComponent from './UserLocation';

import 'styles/utils.scss';
import 'styles/map.scss';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: { present: false },
            selectedItem: null
        };

        this.isPOIsErrorsLaunched = false;
        this.map = null;
        this.maps = null;
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleLocation() {
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 20000
        };

        const locationInProgressAlert = Alerts.createInfoAlert(`Retrieving location...`);
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            if (!this.componentIsMounted) {
                return;
            }

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

            Alerts.close(locationInProgressAlert);
            Alerts.createInfoAlert(`Location found.`);
        }, () => {
            if (!this.componentIsMounted) {
                return;
            }

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
        const eastCorner = borders.getNorthEast(),
            westCorner = borders.getSouthWest();

        const currentMaxLat = eastCorner.lat(),
            currentMaxLng = eastCorner.lng(),
            currentMinLat = westCorner.lat(),
            currentMinLng = westCorner.lng();

        if (typeof this.state.response === 'object') {
            const { maxLat, maxLng, minLat, minLng } = this.state.response.area;

            if (currentMinLat >= minLat && currentMaxLat <= maxLat && currentMinLng >= minLng && currentMaxLng <= maxLng) {
                return;
            }
        }

        if (this.isPOIsErrorsLaunched) {
            return;
        }

        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((response) => {
            if (this.componentIsMounted) {
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
            }
        }).
        catch(() => {
            if (!this.isPOIsErrorsLaunched) {
                Alerts.createErrorAlert('Error while retrieving points of interest. Please, try again later.');
                this.isPOIsErrorsLaunched = true;
            }
        });
    }

    poiSelected(poiId) {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ selectedItem: poiId });
    }

    render() {
        const { lat, lng } = this.state.location;

        let currentLocation = null;
        if (this.state.location.present) {
            currentLocation = <UserLocationComponent lat={lat} lng={lng}/>;
        }

        const poisInViewport = this.state.response && this.state.response.content
            ? this.state.response.content.map((element, index) => {
                return <POIComponent
                    lat={ element.latitude }
                    lng={ element.longitude }
                    onClick={ () => {
                        this.poiSelected(element.poiId);
                    }}
                    key={ index }
                />;
            })
            : null;

        let poiPreview = null;
        if (this.state.selectedItem) {
            poiPreview = <POISideBar
                poiId={this.state.selectedItem}
                onClose={() => {
                    this.poiSelected(null);
                }}
                router={this.props.router}
            />;
        }
        // Try with <span>

        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                {poiPreview}
                <GoogleMapReact defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                                onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }
                                yesIWantToUseGoogleMapApiInternals >
                    { currentLocation }
                    { poisInViewport }
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
    zoom: 17
};

Map.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    router: PropTypes.object,
    zoom: PropTypes.number
};
