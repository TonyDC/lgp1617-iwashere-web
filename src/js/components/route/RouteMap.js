import { GOOGLE_MAPS_API_KEY } from '../../../../config';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import POIComponent from '../map/SelectedLocation';

import 'styles/utils.scss';
import 'styles/map.scss';

const ONE_SIZE = 1;
const ZERO_INDEX = 0;

export default class RouteMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: { present: false },
            selectedItem: null
        };

        this.map = null;
        this.maps = null;
        this.directionsService = null;
        this.directionsDisplay = null;
        this.bounds = null;
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.poiList.length !== this.props.poiList.length &&
            nextProps.poiList.every((poi, index) => {
                return poi === this.props.poiList[index];
            })) {
            this.calculateRoute(nextProps.poiList);
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    calculateRoute(poiList) {
        this.directionsDisplay.set('directions', null);

        const waypts = [];
        for (let index = ONE_SIZE; index < poiList.length - ONE_SIZE; index++) {
            waypts.push({
                location: {
                    lat: poiList[index].latitude,
                    lng: poiList[index].longitude
                },
                stopover: true
            });
        }

        const pois = poiList ? poiList : [];
        if (pois.length > ONE_SIZE) {
            const start = pois[ZERO_INDEX];
            const end = pois[pois.length - ONE_SIZE];
            const request = {
                destination: {
                    lat: end.latitude,
                    lng: end.longitude
                },
                optimizeWaypoints: true,
                origin: {
                    lat: start.latitude,
                    lng: start.longitude
                },
                travelMode: 'WALKING',
                waypoints: waypts
            };

            this.directionsService.route(request, (response, status) => {
                if (status === "OK") {
                    this.directionsDisplay.setDirections(response);
                }
            });
        }
    }

    onGoogleAPILoaded({ map, maps }) {
        this.map = map;
        this.maps = maps;
        this.directionsService = new this.maps.DirectionsService();
        this.directionsDisplay = new this.maps.DirectionsRenderer({
            map,
            suppressMarkers: true
        });

        if (this.props.readOnly) {
            if (this.bounds) {
                this.map.fitBounds(this.bounds);
            } else {
                this.onPropsUpdated();
            }
        } else {
            map.addListener('tilesloaded', () => {
                this.props.onMapChanged(map.getBounds());
            });
        }
    }

    onPropsUpdated() {
        if (!this.maps || !this.map) {
            return;
        }

        this.propsUpdated = true;

        if (this.props.poiList && this.props.poiList.length === ONE_SIZE) {
            const poi = this.props.poiList[ZERO_INDEX];
            this.map.setCenter({
                lat: poi.latitude,
                lng: poi.longitude
            });

            return;
        }

        const bounds = new this.maps.LatLngBounds();
        this.props.poiList.forEach((poi) => {
            bounds.extend({
                lat: poi.latitude,
                lng: poi.longitude
            });
        });

        this.map.fitBounds(bounds);
        this.calculateRoute(this.props.poiList);
    }

    render() {
        if (!this.propsUpdated && this.props.poiList.length) {
            this.onPropsUpdated();
        }

        let poisList = this.props.poiList ? this.props.poiList : [];
        if (this.props.allPois) {
            poisList = this.props.allPois;
        }

        const poisInViewport = poisList.map((element) => {
            return <POIComponent key={ element.poiId }
                                 lat={ element.latitude }
                                 lng={ element.longitude }
                                 onClick={ () => {
                                     this.props.onPoiSelected(element.poiId);
                                 }}/>;
        });

        return (
            <div className="route-map wrapper-fill">
                <GoogleMapReact defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                                onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }>
                    {poisInViewport}
                </GoogleMapReact>
            </div>
        );
    }
}

RouteMap.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    poiList: [],
    readOnly: false,
    zoom: 17
};

RouteMap.propTypes = {
    allPois: PropTypes.array,
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    onMapChanged: PropTypes.func,
    onPoiSelected: PropTypes.func.isRequired,
    poiList: PropTypes.array,
    readOnly: PropTypes.bool,
    router: PropTypes.object,
    zoom: PropTypes.number
};
