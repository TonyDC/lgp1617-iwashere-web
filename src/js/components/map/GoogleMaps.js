import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'styles/utils.scss';

export default class GoogleMaps extends Component {

    constructor(props) {
        super(props);

        this.markers = [];
    }

    componentDidMount() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.props.center,
            streetViewControl: this.props.streetViewControl,
            zoom: this.props.zoom,
            fullscreenControl: false
        });

        this.map.addListener('dragend', () => {
            const borders = this.map.getBounds();
            this.fetchPoints(borders);
        });
    }


    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate() {
        return false;
    }

    fetchPoints(borders) {
        console.log(this.map);
        const { b, f } = borders;

        this.markers.forEach((marker) => {
            marker.setMap(null);
        });

        fetch(`/api/poi/range/${f.f}/${f.b}/${b.b}/${b.f}`).then((response) => {
            return response.json();
        }).
        then((response) => {
            response.forEach((element) => {
                this.markers.push(new window.google.maps.Marker({
                    map: this.map,
                    position: {
                        lat: element.latitude,
                        lng: element.longitude
                    }
                }));
            });
        });
    }

    render() {
        return (
            <div id="map" className="wrapper-fill"/>
        );
    }
}

GoogleMaps.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    showCenter: false,
    streetViewControl: false,
    zoom: 8
};

GoogleMaps.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    showCenter: PropTypes.bool,
    streetViewControl: PropTypes.bool,
    zoom: PropTypes.number
};
