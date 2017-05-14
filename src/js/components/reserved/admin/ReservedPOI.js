import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import { blue500 as POIColor, red500 as currentLocationColor } from 'material-ui/styles/colors';

import { GOOGLE_MAPS_API_KEY } from '../../../../../config';
import Pin from '../../map/Pin';

import Tags from '../../utils/MyTags';

import 'styles/utils.scss';
import 'styles/map.scss';

const buttonStyle = { marginLeft: 20 };

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = {
    marginLeft: 30
};

const titleDividerStyle = {
    marginLeft: 30,
    width: 300
};

const mapContainerStyle = {
    position: 'relative',
    height: 400,
    width: 400
};

const mapStyle = {
    height: '100%'
};

const SelectedLocation = (props) => {
    return <Pin lat={ props.lat } lng={ props.lng }>
        <div className="pin">
            <IconButton>
                <CommunicationLocationOn color={ POIColor }/>
            </IconButton>
        </div>
    </Pin>;
};

SelectedLocation.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};

export default class ReservedPOI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            tags: [],
            metaInfo: '',
            mapCoords: null,
            location: null
        };
    }

    componentDidMount() {

    }

    fetchPOITypes() {
        fetch('')
    }

    handleName(event) {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }

    handleDescription(event) {
        event.preventDefault();
        this.setState({ description: event.target.value });
    }

    handleAddress(event) {
        event.preventDefault();
        this.setState({ address: event.target.value });
    }

    handleMetaInfo(event) {
        event.preventDefault();
        this.setState({ metaInfo: event.target.value });
    }

    onGoogleAPILoaded({ map, maps }) {
        this.map = map;
        this.maps = maps;

        map.addListener('click', (param) => {
            const { lat, lng } = param.latLng;
            this.setState({
                location: {
                    lat: lat(),
                    lng: lng()
                }
            });
        });
    }

    handleAddTag(tag) {
        this.state.tags.push(tag);
    }

    render() {
        const { location } = this.state;

        let selectedLocationPin = null;
        if (location) {
            const { lat, lng } = location;
            selectedLocationPin = (
                <SelectedLocation lat={lat} lng={lng}/>
            );
        }


        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Reserved - POI</title>
                </Helmet>
                <div style={mainStyle}>
                    <h3 style={titleStyle}>Create POI</h3>
                    <Divider style={titleDividerStyle}/>
                    <TextField
                        hintText="Name"
                        floatingLabelText="Name of Point of Interest"
                        fullWidth
                        onChange={ this.handleName.bind(this) }
                    />
                    <TextField
                        hintText="Address"
                        floatingLabelText="Address of Point of Interest"
                        fullWidth
                        multiLine
                        onChange={ this.handleAddress.bind(this) }
                    />
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description of Point of Interest"
                        fullWidth
                        multiLine
                        onChange={ this.handleDescription.bind(this) }
                    />
                    { /* TODO tags */ }
                    <Tags onAddTag={ this.handleAddTag.bind(this) }/>
                    <TextField
                        hintText="Additional information"
                        floatingLabelText="Additional information"
                        fullWidth
                        multiLine
                        onChange={ this.handleMetaInfo.bind(this) }
                    />
                    { /* TODO conteúdos */ }
                    <h5>Select location</h5>
                    <Paper zDepth={2} style={mapContainerStyle}>
                        <GoogleMapReact defaultCenter={this.props.center}
                                        defaultZoom={this.props.zoom}
                                        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                                        onGoogleApiLoaded={ this.onGoogleAPILoaded.bind(this) }
                                        yesIWantToUseGoogleMapApiInternals
                                        style={mapStyle}
                        >
                            { selectedLocationPin }
                        </GoogleMapReact>
                    </Paper>
                </div>
                <RaisedButton label="Submit" style={buttonStyle} />
            </Paper>
        );
    }
}

ReservedPOI.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    zoom: 17
};
