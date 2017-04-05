import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

import {GOOGLE_MAPS_API_KEY} from '../../../config/my-config';

const coords = {
    lat: 41.14792237,
    lng: -8.61129427
};

const params = {key: GOOGLE_MAPS_API_KEY, v: '3.exp'};

export default class Map extends Component {


    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true});
    }

    onDragEnd(event) {
        console.log('onDragEnd', event);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(event) {
        console.log('onClick', event);
    }

    render() {
        return (
            <Gmaps
                width={'800px'}
                height={'600px'}
                lat={coords.lat}
                lng={coords.lng}
                zoom={12}
                loadingMessage={'Be happy'}
                params={params}
                onMapCreated={this.onMapCreated}>

                <Marker
                    lat={coords.lat}
                    lng={coords.lng}
                    draggable={true}
                    onDragEnd={this.onDragEnd} />

                <InfoWindow
                    lat={coords.lat}
                    lng={coords.lng}
                    content={'Hello, React :)'}
                    onCloseClick={this.onCloseClick} />

                <Circle
                    lat={coords.lat}
                    lng={coords.lng}
                    radius={500}
                    onClick={this.onClick} />
            </Gmaps>
        );
    }
}

Map.propTypes = {location: React.PropTypes.object};
