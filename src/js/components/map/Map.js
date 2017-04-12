import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Button } from 'react-bootstrap';
import MotionMenu from 'react-motion-menu';

import Pin from './Pin';

import 'styles/utils.scss';

/*
 // 'apiKey' prop
 <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
 <Pin lat={41.14792237} lng={-8.61129427}>
 <Button><MotionMenu type="circle" margin={120} >
 <Button>This is a button</Button>
 </MotionMenu></Button>
 </Pin>
 </GoogleMapReact>
 */

export default class Map extends Component {

    render() {
        return (

                <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                    <Pin lat={41.14792237} lng={-8.61129427}>
                        <MotionMenu type="circle" margin={120} x={0} y={0}>
                            <Button className="button"><div className="fa fa-map-pin" aria-hidden="true"/></Button>
                            <Button className="item1"><div className="fa fa-road" aria-hidden="true"/></Button>
                            <Button className="item2"><div className="fa fa-info" aria-hidden="true"/></Button>
                            <Button className="item2"><div className="fa fa-camera" aria-hidden="true"/></Button>
                            <Button className="item2"><div className="fa fa-clock-o" aria-hidden="true"/></Button>
                            <Button className="item2"><div className="fa fa-codepen" aria-hidden="true"/></Button>
                            <Button className="item2"><div className="fa fa-wrench" aria-hidden="true"/></Button>
                        </MotionMenu>
                    </Pin>
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
