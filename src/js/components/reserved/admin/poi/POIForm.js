import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Dropzone from 'react-dropzone';
import httpCodes from 'http-status-codes';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { GOOGLE_MAPS_API_KEY } from '../../../../../../config/index';

import SelectedLocation from '../../../map/SelectedLocation';
import Tags from '../../../utils/MyTags';
import Alerts from '../../../utils/Alerts';

import 'styles/utils.scss';
import 'styles/map.scss';
import 'styles/dropzone.scss';

const POI_TYPE_FIRST_ID = 1;
const ZERO_INDEX = 0;
const NO_ELEMENTS = 0;
const ONE_ELEMENT = 1;
const FIRST_ELEMENT_INDEX = 0;
const POI_TYPE_LANG_SEPARATOR = ';';

const buttonStyle = { marginLeft: 20 };

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 30 };

const titleDividerStyle = {
    marginLeft: 30,
    width: 300
};

const mapContainerStyle = {
    position: 'relative',
    height: 400,
    width: 'auto',
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

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            addressError: false,
            description: '',
            descriptionError: false,
            dropzoneActive: false,
            files: [],
            location: null,
            metaInfo: '',
            name: '',
            nameError: false,
            selectedType: -1,
            selectedTypeError: false,
            submitInProgress: false,
            tags: [],
            types: [
                {
                    name: 'Fetching...;A buscar...',
                    poiTypeId: -1
                },
                {
                    name: 'No types found;Sem tipos de POI',
                    poiTypeId: -2
                },
                {
                    name: 'Error fetching types;Erro ao buscar os tipos',
                    poiTypeId: -3
                }
            ]
        };
        const { initialValues } = props;
        if (initialValues) {
            this.state = { ...initialValues };
        }
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
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

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
                this.setState({ selectedType: -2 });
            } else {
                this.setState({
                    selectedType: 1,
                    types
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
        this.setState({
            name: event.target.value,
            nameError: false
        });
    }

    handleDescription(event) {
        event.preventDefault();
        this.setState({
            description: event.target.value,
            descriptionError: false
        });
    }

    handleAddress(event) {
        event.preventDefault();
        this.setState({
            address: event.target.value,
            addressError: false
        });
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
        const cloneTagsArray = this.state.tags.slice(ZERO_INDEX);
        cloneTagsArray.push(tag);
        this.setState({ tags: cloneTagsArray });
    }

    handleRemoveTag(tag) {
        const cloneTagsArray = this.state.tags.slice(ZERO_INDEX);
        this.setState({ tags: cloneTagsArray.splice(tag, ONE_ELEMENT) });
    }

    handlePOIType(event, index, selectedType) {
        this.setState({
            selectedType,
            selectedTypeError: false
        });
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
        }

        const cloneFilesArray = this.state.files.slice(ZERO_INDEX);
        // TODO index files array by file hash
        files.forEach((file) => {
            cloneFilesArray.push(file);
        });
        this.setState({ files: cloneFilesArray });
    }

    checkParams() {
        let error = false;
        let { name, address, description } = this.state;
        const { selectedType, location } = this.state;

        name = name.trim();
        if (name.length === NO_ELEMENTS) {
            this.setState({
                name,
                nameError: 'Name must not be empty'
            });
            error = true;
        }

        address = address.trim();
        if (address.length === NO_ELEMENTS) {
            this.setState({
                address,
                addressError: 'Address must not be empty'
            });
            error = true;
        }

        description = description.trim();
        if (description.length === NO_ELEMENTS) {
            this.setState({
                description,
                descriptionError: 'Description must not be empty'
            });
            error = true;
        }

        if (selectedType < POI_TYPE_FIRST_ID) {
            this.setState({ selectedTypeError: 'Bad selected type' });
            error = true;
        }

        if (location === null) {
            if (this.locationErrorAlert) {
                Alerts.close(this.locationErrorAlert);
                this.locationErrorAlert = null;
            }
            this.locationErrorAlert = Alerts.createErrorAlert('A location must be chosen for the POI in the map');
            error = true;
        }

        return !error;
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitInProgress: true });

        if (!this.checkParams()) {
            return;
        }

        const { onSave } = this.props;
        if (typeof onSave === 'function') {
            onSave(this.state).
            then(() => {
                if (this.componentIsMounted) {
                    this.setState({ submitInProgress: false });
                    this.resetFields();
                }

                Alerts.createInfoAlert('POI created successfully');
            }).
            catch(() => {
                if (this.componentIsMounted) {
                    this.setState({ submitInProgress: false });
                }

                if (this.formFetchError) {
                    Alerts.close(this.formFetchError);
                    this.formFetchError = null;
                }
                this.formFetchError = Alerts.createErrorAlert('Error in submitting the information. Please, try again later.');
            });
        }
    }

    resetFields() {
        this.setState({
            address: '',
            addressError: false,
            description: '',
            descriptionError: false,
            dropzoneActive: false,
            files: [],
            location: null,
            metaInfo: '',
            name: '',
            nameError: false,
            selectedType: POI_TYPE_FIRST_ID,
            selectedTypeError: false,
            tags: []
        });
    }

    // TODO campo para colocar o parent do POI
    // TODO campo para colocar o contexto do utilizador
    render() {
        const { location, metaInfo, name, nameError, address, addressError, description, descriptionError, selectedType, selectedTypeError, submitInProgress } = this.state;

        let selectedLocationPin = null;
        if (location) {
            const { lat, lng } = location;
            selectedLocationPin = (
                <SelectedLocation lat={lat} lng={lng}/>
            );
        }

        return (<div style={mainStyle}>
            <form onSubmit={ this.handleSubmit.bind(this) }>
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
                    fullWidth
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
                { /* onTouchTap is not required: the button is inside a form, with a defined submit behaviour */ }
                <RaisedButton type="submit" label="Submit" primary disabled={ submitInProgress } />
            </form>
        </div>
        );
    }
}

POIForm.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    zoom: 17
};

POIForm.propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    zoom: PropTypes.number,
    initialValues: PropTypes.object,
    onSave: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};
