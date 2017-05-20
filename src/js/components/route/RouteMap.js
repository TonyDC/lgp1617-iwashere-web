import { GOOGLE_MAPS_API_KEY } from '../../../../config';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import IconButton from 'material-ui/IconButton';

import Pin from '../map/Pin';

import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

import { blue500 as POIColor } from 'material-ui/styles/colors';

import 'styles/utils.scss';
import 'styles/map.scss';

// TODO cahange
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

export default class RouteMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: { present: false },
            selectedItem: null
        };

        this.map = null;
        this.maps = null;
        this.bounds = null;
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    onGoogleAPILoaded({ map, maps }) {
        this.map = map;
        this.maps = maps;

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
        const bounds = new this.maps.LatLngBounds();
        this.props.poiList.forEach((poi) => {
            bounds.extend({
                lat: poi.latitude,
                lng: poi.longitude
            });
        });

        this.map.fitBounds(bounds);
    }

    render() {

        if (!this.propsUpdated && this.props.poiList.length) {
            this.onPropsUpdated();
        }

        let poisList = this.props.poiList;
        if (!poisList) {
            poisList = [];
        }

        const poisInViewport = poisList.map((element, index) => {
            return <POIComponent lat={ element.latitude }
                                 lng={ element.longitude }
                                 clickHandler={ () => {
                                     this.props.onPoiSelected(element.poiId);
                                 }}
                                 key={ index }
                    />;
        });

        return (
            <div className="route-map wrapper-fill">
                <GoogleMapReact defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                                onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }
                >
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
