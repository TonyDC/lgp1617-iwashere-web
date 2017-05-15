import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import Dropzone from 'react-dropzone';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import { blue500 as POIColor } from 'material-ui/styles/colors';

import { GOOGLE_MAPS_API_KEY } from '../../../../../config';
import Pin from '../../map/Pin';

import Tags from '../../utils/MyTags';
import Alerts from '../../utils/Alerts';

import 'styles/utils.scss';
import 'styles/map.scss';
import 'styles/dropzone.scss';

const POI_TYPE_FIRST_ID = 0;
const ZERO_INDEX = 0;
const NO_ELEMENTS = 0;
const ONE_ELEMENT = 1;
const NOT_FOUND = -1;
const FIRST_ELEMENT_INDEX = 0;
const POI_TYPE_LANG_SEPARATOR = ';';

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
    width: 400,
    marginBottom: 40
};

const mapStyle = {
    height: '100%'
};

const dropzoneContainerStyle = {
    position: 'relative',
    minHeight: 100
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
            location: null,
            dropzoneActive: false,
            files: [],
            types: [
                {
                    poiTypeId: -1,
                    name: 'Fetching...;A buscar...'
                },
                {
                    poiTypeId: -2,
                    name: 'No types found;Sem tipos de POI'
                },
                {
                    poiTypeId: -3,
                    name: 'Error fetching types;Erro ao buscar os tipos'
                }],
            selectedType: -1
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchPOITypes();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPOITypes() {
        fetch('/api/poi/types').
        then((response) => {
            return response.json();
        }).
        then((types) => {
            if (!types) {
                return Promise.reject(new Error('Invalid type object'));
            }

            if (!this.componentIsMounted) {
                return null;
            }

            if (types.length === NO_ELEMENTS) {
                this.setState({
                    selectedType: -2
                });
            } else {
                this.setState({
                    types,
                selectedType: 1
                });
            }

            return null;
        }).
        catch(() => {
            if (this.componentIsMounted) {
                this.setState({ selectedType: -3 });
            }
        });
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

    handleRemoveTag(tag) {
        const cloneTagsArray = this.state.tags.slice(0);
        this.setState({ tags: cloneTagsArray.splice(tag, 1) });
    }

    handlePOIType(event, index, selectedType) {
        this.setState({ selectedType });
    }

    onDragEnter() {
        this.setState({ dropzoneActive: true });
    }

    onDragLeave() {
        this.setState({ dropzoneActive: false });
    }

    onDrop(files, rejected) {
        this.setState({ dropzoneActive: false });
        if (this.uploadErrorAlert) {
            Alerts.close(this.uploadErrorAlert);
            this.uploadErrorAlert = null;
        }

        if (rejected && rejected.length > NO_ELEMENTS) {
            rejected.forEach((file) => {
                window.URL.revokeObjectURL(file.preview);
            });
            this.uploadErrorAlert = Alerts.createErrorAlert('Some files were rejected. Only .png or .jpeg files are accepted');
            // this.setState({ rejected: true });

            // If any error has been detected, return
            // TODO remove return statement in Create Post, due to memory leak issues
        }

        this.state.files.forEach((file) => {
            window.URL.revokeObjectURL(file.preview);
        });
        this.setState({ files });
    }

    handleSubmit(event) {
        event.preventDefault();


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
                    <form onSubmit={ this.handleSubmit.bind(this) }>
                        <h3 style={titleStyle}>Create POI</h3>
                        <Divider style={titleDividerStyle}/>
                        <TextField
                            id="name"
                            hintText="Name"
                            floatingLabelText="Name of Point of Interest"
                            fullWidth
                            onChange={ this.handleName.bind(this) }
                        />
                        <TextField
                            id="address"
                            hintText="Address"
                            floatingLabelText="Address of Point of Interest"
                            fullWidth
                            multiLine
                            onChange={ this.handleAddress.bind(this) }
                        />
                        <TextField
                            id="description"
                            hintText="Description"
                            floatingLabelText="Description of Point of Interest"
                            fullWidth
                            multiLine
                            onChange={ this.handleDescription.bind(this) }
                        />
                        <TextField
                            id="additional-info"
                            hintText="Additional information"
                            floatingLabelText="Additional information"
                            fullWidth
                            multiLine
                            onChange={ this.handleMetaInfo.bind(this) }
                        />
                        <SelectField
                            floatingLabelText="POI Type"
                            value={this.state.selectedType}
                            onChange={ this.handlePOIType.bind(this) }
                            disabled={ this.state.selectedType < POI_TYPE_FIRST_ID }
                        >
                            {
                                this.state.types.map((element, index) => {
                                    const { poiTypeId, name } = element;
                                    const renderName = name.split(POI_TYPE_LANG_SEPARATOR);

                                    return (<MenuItem key={index}
                                                      value={poiTypeId}
                                                      primaryText={renderName.length > ONE_ELEMENT
                                                          ? renderName[ZERO_INDEX]
                                                          : name } />);
                                })
                            }
                        </SelectField>
                        <Tags title="Tags" tags={ this.state.tags } onAddTag={ this.handleAddTag.bind(this) } onRemoveTag={ this.handleRemoveTag.bind(this) } fullWidth/>
                        <h5>Select location (click on the map to select a location)</h5>
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
                        <h5>Files to upload</h5>
                        <Paper>
                            <Dropzone className="custom-dropzone" style={dropzoneContainerStyle} onDrop={this.onDrop.bind(this)} accept="image/jpeg, image/png" onDragEnter={this.onDragEnter.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                                { this.state.dropzoneActive && <div className="overlay">Drop files...</div> }
                                <div className="dropzone-info">Drag and drop files here (png, jpeg)</div>
                                { /* this.state.rejected && <p className="dropzone-info">Files were rejected. Only .png or .jpeg files are accepted</p> */ }
                                { this.state.files.length === NO_ELEMENTS && <p className="dropzone-info">No files to upload yet</p> }
                                {
                                    this.state.files &&
                                    this.state.files.map((file, index) => {
                                        return (<span key={index} onClick={(event) => {
                                            event.preventDefault();
                                            // Stop event propagation to Dropzone event handler
                                            event.stopPropagation();

                                            const files = this.state.files.slice(FIRST_ELEMENT_INDEX);
                                            files.splice(index, ONE_ELEMENT);
                                            window.URL.revokeObjectURL(file.preview);
                                            this.setState({ files });
                                        }}>
                                            <div className="dropzone-thumbnail-container">
                                                <img src={file.preview} className="dropzone-thumbnail"/>
                                                <i className="fa fa-trash dropzone-delete-icon" aria-hidden="true"/>
                                            </div>
                                </span>);
                                    })
                                }
                            </Dropzone>
                        </Paper>
                    </form>
                </div>
                <RaisedButton type="submit" label="Submit" primary style={buttonStyle} onTouchTap={ this.handleSubmit.bind(this) }/>
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

ReservedPOI.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    zoom: PropTypes.number
};
