import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Alerts from '../utils/Alerts';
import httpCodes from 'http-status-codes';
import { blue500 as POIColor, red500 as currentLocationColor } from 'material-ui/styles/colors';
import { GOOGLE_MAPS_API_KEY } from '../../../../config';
import POISideBar from '../poi/POISideBar';

import Pin from './Pin';

import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';

import 'styles/utils.scss';
import 'styles/map.scss';

const POIComponent = (props) => {
    return <Pin lat={props.lat} lng={props.lng} onClick={props.clickHandler}>
        <div className="pin">
            <IconButton>
                <CommunicationLocationOn color={ POIColor }/>
            </IconButton>
        </div>
    </Pin>;
};

POIComponent.propTypes = {
    clickHandler: PropTypes.any.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};


const UserLocationComponent = (props) => {
    return <Pin lat={ props.lat } lng={ props.lng }>
        <div className="pin">
            <IconButton>
                <MapsMyLocation color={ currentLocationColor }/>
            </IconButton>
        </div>
    </Pin>;
};

UserLocationComponent.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};

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

    handleLocation() {
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 20000
        };

        const locationInProgressAlert = Alerts.createInfoAlert(`Retrieving location...`);
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

            Alerts.close(locationInProgressAlert);
            Alerts.createInfoAlert(`Location found.`);
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
        const latitudeRange = borders.f,
            longitudeRange = borders.b;
        const currentMaxLat = latitudeRange.b,
            currentMaxLng = longitudeRange.f,
            currentMinLat = latitudeRange.f,
            currentMinLng = longitudeRange.b;

        if (typeof this.state.response === 'object') {
            const { maxLat, maxLng, minLat, minLng } = this.state.response.area;

            if (currentMinLat >= minLat && currentMaxLat <= maxLat && currentMinLng >= minLng && currentMaxLng <= maxLng) {
                return;
            }
        }

        if (this.isPOIsErrorsLaunched) {
            return;
        }

        fetch(`/api/poi/range/${currentMinLat}/${currentMaxLat}/${currentMinLng}/${currentMaxLng}`).then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

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
        }).
        catch(() => {
            if (!this.isPOIsErrorsLaunched) {
                Alerts.createErrorAlert('Error while retrieving points of interest. Please, try again later.');
                this.isPOIsErrorsLaunched = true;
            }
        });
    }

    poiSelected(poiId) {
        this.setState({ selectedItem: poiId });
        console.log('item selected', poiId);
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
                            clickHandler={ () => {
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

        return (
            <div className="wrapper-fill">
                {poiPreview}
                <GoogleMapReact defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                                onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }>
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
