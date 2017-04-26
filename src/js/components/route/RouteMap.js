import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import GoogleMapReact from 'google-map-react';
import { blue500 as POIColor } from 'material-ui/styles/colors';
import { GOOGLE_MAPS_API_KEY } from '../../../../config';
import POISideBar from '../poi/POISideBar';

import Pin from '../map/Pin';

import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

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

export default class RouteMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: { present: false },
            selectedItem: null
        };

        this.map = null;
        this.maps = null;
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
    }

    poiSelected(poiId) {
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ selectedItem: poiId });
    }

    render() {
        if (!this.props.poiList || !this.map) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        const poisInViewport = this.props.poiList.map((element, index) => {
            return <POIComponent
                lat={ element.latitude }
                lng={ element.longitude }
                clickHandler={ () => {
                    this.poiSelected(element.poiId);
                }}
                key={ index }
            />;
        });

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
                    { poisInViewport }
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
    zoom: 17
};

RouteMap.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    poiList: PropTypes.array,
    router: PropTypes.object,
    zoom: PropTypes.number
};
