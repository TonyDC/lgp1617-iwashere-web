import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import Dropzone from 'react-dropzone';
import firebase from 'firebase';
import httpCodes from 'http-status-codes';
import nProgress from 'nprogress';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import { blue500 as POIColor } from 'material-ui/styles/colors';

import { GOOGLE_MAPS_API_KEY } from '../../../../../../config/index';
import Pin from '../../../map/Pin';

import SelectedLocation from '../../../map/SelectedLocation';
import Tags from '../../../utils/MyTags';
import Alerts from '../../../utils/Alerts';

import 'styles/utils.scss';
import 'styles/map.scss';
import 'styles/dropzone.scss';

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

export default class POIForm extends Component {

    render() {
        const { location, metaInfo, name, nameError, address, addressError, description, descriptionError, selectedType, selectedTypeError } = this.state;

        let selectedLocationPin = null;
        if (location) {
            const { lat, lng } = location;
            selectedLocationPin = (
                <SelectedLocation lat={lat} lng={lng}/>
            );
        }

        return (<div style={mainStyle}>
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <h3 style={titleStyle}>Create POI</h3>
                <Divider style={titleDividerStyle}/>
                <TextField
                    id="name"
                    hintText="Name"
                    floatingLabelText="Name of Point of Interest"
                    fullWidth
                    errorText={ nameError? nameError : null }
                    value={name}
                    onChange={ this.handleName.bind(this) }
                />
                <TextField
                    id="address"
                    hintText="Address"
                    floatingLabelText="Address of Point of Interest"
                    fullWidth
                    multiLine
                    errorText={ addressError? addressError : null }
                    value={address}
                    onChange={ this.handleAddress.bind(this) }
                />
                <TextField
                    id="description"
                    hintText="Description"
                    floatingLabelText="Description of Point of Interest"
                    fullWidth
                    multiLine
                    errorText={ descriptionError? descriptionError : null }
                    value={description}
                    onChange={ this.handleDescription.bind(this) }
                />
                <TextField
                    id="additional-info"
                    hintText="Additional information"
                    floatingLabelText="Additional information"
                    fullWidth
                    multiLine
                    value={metaInfo}
                    onChange={ this.handleMetaInfo.bind(this) }
                />
                <SelectField
                    floatingLabelText="POI Type"
                    value={selectedType}
                    errorText={ selectedTypeError? selectedTypeError : null }

                    onChange={ this.handlePOIType.bind(this) }
                    disabled={ this.state.selectedType < POI_TYPE_FIRST_ID }
                >
                    {
                        this.state.types.map((element, index) => {
                            const { poiTypeId, name: typeName } = element;
                            const renderName = typeName.split(POI_TYPE_LANG_SEPARATOR);

                            return (<MenuItem key={index}
                                              value={poiTypeId}
                                              primaryText={renderName.length > ONE_ELEMENT
                                                  ? renderName[ZERO_INDEX]
                                                  : typeName } />);
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

                <RaisedButton type="submit" label="Submit" primary style={buttonStyle} onTouchTap={ this.handleSubmit.bind(this) }/>
            </form>
        </div>
        );
    }
}

POIForm.propTypes = { editPOI: PropTypes.string };
