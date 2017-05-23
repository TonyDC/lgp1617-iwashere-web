import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Dropzone from 'react-dropzone';
import httpCodes from 'http-status-codes';
import nProgress from 'nprogress';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { GOOGLE_MAPS_API_KEY } from '../../../../../../config/index';

import SelectedLocation from '../../../map/SelectedLocation';
import Tree from '../../../utils/ContextTree';
import Tags from '../../../utils/MyTags';
import Alerts from '../../../utils/Alerts';
import Image from '../../../utils/Image';

import 'styles/utils.scss';
import 'styles/map.scss';
import 'styles/dropzone.scss';

const POI_TYPE_FIRST_ID = 1;
const ZERO_INDEX = 0;
const NO_ELEMENTS = 0;
const ONE_ELEMENT = 1;
const FIRST_ELEMENT_INDEX = 0;
const POI_TYPE_LANG_SEPARATOR = ';';

const DECIMAL_RADIX = 10;

const buttonContainerStyle = { marginTop: 20 };
const buttonStyle = { marginRight: 20 };

// TODO refactor
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
    height: 400,
    marginBottom: 40,
    position: 'relative',
    width: 'auto'
};

const mapStyle = {
    height: '100%'
};

const dropzoneContainerStyle = {
    minHeight: 100,
    position: 'relative'
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
            filesDeleted: [],
            filesOnFirebase: [],
            location: null,
            metaInfo: '',
            name: '',
            nameError: false,
            selectedContext: null,
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

        this.lastMediaIndex = 0;

        const { initialValues } = props;
        if (initialValues) {
            // Component did not render yet
            Object.assign(this.state, initialValues);
            // Note that children must have a unique 'key' value. Due to render implementations, keys cannot be reused.
            this.state.filesOnFirebase.map((element) => {
                Object.assign(element, { _idx: this.lastMediaIndex++ });

                return element;
            });
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
                const { initialValues } = this.props;
                let initialSelectedType = POI_TYPE_FIRST_ID;
                if (initialValues) {
                    initialSelectedType = parseInt(initialValues.selectedType, DECIMAL_RADIX);
                    if (isNaN(initialSelectedType)) {
                        initialSelectedType = POI_TYPE_FIRST_ID;
                    }
                }
                this.setState({
                    selectedType: initialSelectedType,
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

        // Center map if location is provided (edit mode)
        const { location } = this.state;
        if (location) {
            map.setCenter(location);
        }
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

    handleContextSelection(event) {
        const { nodes, edges } = event;
        const [selectedIndex] = nodes;
        if (typeof selectedIndex === 'number') {
            this.setState({ selectedContext: selectedIndex });
        } else {
            this.setState({ selectedContext: null });
        }
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
            Object.assign(file, { _idx: this.lastMediaIndex++ });
            cloneFilesArray.push(file);
        });
        this.setState({ files: cloneFilesArray });
    }

    checkParams() {
        let error = false;
        let { name, address, description } = this.state;
        const { selectedType, location, selectedContext } = this.state;

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

        if (selectedContext === null) {
            if (this.contextErrorAlert) {
                Alerts.close(this.contextErrorAlert);
                this.contextErrorAlert = null;
            }
            this.contextErrorAlert = Alerts.createErrorAlert('A context must be chosen from the tree');
            error = true;
        }

        return !error;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.checkParams()) {
            return;
        }

        this.setState({ submitInProgress: true });

        const { onSave, resetAfterSubmit } = this.props;
        if (typeof onSave !== 'function') {
            this.setState({ submitInProgress: false });
            throw new Error('onSave function not defined');
        }

        nProgress.start();
        onSave(this.state).
        then(() => {
            if (this.componentIsMounted && resetAfterSubmit) {
                this.resetFields();
            }
            Alerts.createInfoAlert('POI information successfully submitted');
        }).
        catch(() => {
            if (this.formFetchError) {
                Alerts.close(this.formFetchError);
                this.formFetchError = null;
            }
            this.formFetchError = Alerts.createErrorAlert('Error in submitting the information. Please, try again later.');
        }).
        then(() => {
            if (this.componentIsMounted) {
                this.setState({ submitInProgress: false });
            }
            nProgress.done();
        });
    }

    handleDelete(event) {
        event.preventDefault();

        const { onDelete } = this.props;
        if (typeof onDelete !== 'function') {
            throw new Error('onDelete function not defined');
        }

        const { deleted } = this.state;
        if (typeof deleted !== 'boolean') {
            throw new Error('Edit mode not activated');
        }

        this.setState({ submitInProgress: true });
        nProgress.start();
        onDelete(!deleted).
        then(() => {
            const statusMessage = deleted ? 'visible' : 'hidden';
            if (this.deleteInfoAlert) {
                Alerts.close(this.deleteInfoAlert);
                this.deleteInfoAlert = null;
            }
            this.deleteInfoAlert = Alerts.createInfoAlert(`POI is now ${statusMessage}`);
            if (this.componentIsMounted) {
                this.setState({
                    deleted: !deleted,
                    submitInProgress: false
                });
            }
        }).
        catch((err) => {
            console.error(err);
            if (this.componentIsMounted) {
                this.setState({ submitInProgress: false });
            }
            if (this.formFetchError) {
                Alerts.close(this.formFetchError);
                this.formFetchError = null;
            }
            this.formFetchError = Alerts.createErrorAlert('An error has occurred while toggling the POI deleted status');
        }).
        then(() => {
            nProgress.done();
        });
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
            selectedContext: null,
            selectedType: POI_TYPE_FIRST_ID,
            selectedTypeError: false,
            tags: []
        });
        const { tree } = this.refs;
        tree.clearSelection();
    }

    getContext() {
        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || contexts.length === NO_ELEMENTS) {
            throw new Error('No contexts available.');
        } else if (typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected.');
        }

        return contexts[selectedContextIndex].contextId;
    }

    // TODO campo para colocar o parent do POI
    // TODO campo para colocar o contexto do utilizador
    // TODO dar o user context para a árvore
    render() {
        const { location, metaInfo, name, nameError, address, addressError, description, descriptionError, selectedContext, selectedType, selectedTypeError, submitInProgress, deleted } = this.state;

        let selectedLocationPin = null;
        if (location) {
            const { lat, lng } = location;
            selectedLocationPin = (
                <SelectedLocation lat={lat} lng={lng}/>
            );
        }

        let deleteButton = null;
        if (this.props.onDelete) {
            let label = "Hide POI";
            if (deleted) {
                label = "Show POI";
            }
            deleteButton = <RaisedButton style={buttonStyle} label={label} secondary disabled={ submitInProgress } onTouchTap={ this.handleDelete.bind(this) } />;
        }

        return (
            <div style={mainStyle}>
                <TextField id="name" hintText="Name" floatingLabelText="Name of Point of Interest" fullWidth
                    errorText={ nameError ? nameError : null } value={name} onChange={ this.handleName.bind(this) }
                />
                <TextField id="address" hintText="Address" floatingLabelText="Address of Point of Interest" fullWidth multiLine
                    errorText={ addressError ? addressError : null } value={address} onChange={ this.handleAddress.bind(this) }
                />
                <TextField id="description" hintText="Description" floatingLabelText="Description of Point of Interest" fullWidth multiLine
                    errorText={ descriptionError ? descriptionError : null } value={description} onChange={ this.handleDescription.bind(this) }
                />
                <TextField id="additional-info" hintText="Additional information" floatingLabelText="Additional information" fullWidth multiLine
                    value={metaInfo} onChange={ this.handleMetaInfo.bind(this) }
                />
                <SelectField floatingLabelText="POI Type" fullWidth
                    value={selectedType} errorText={ selectedTypeError? selectedTypeError : null } onChange={ this.handlePOIType.bind(this) } disabled={ this.state.selectedType < POI_TYPE_FIRST_ID }
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
                <Tags title="Add tags..." hintText="Tags" tags={ this.state.tags } onAddTag={ this.handleAddTag.bind(this) } onRemoveTag={ this.handleRemoveTag.bind(this) } fullWidth/>
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
                <Paper zDepth={2}>
                    <Tree ref="tree" userContext={ this.getContext() } initialSelectedNode={selectedContext} onSelect={ this.handleContextSelection.bind(this) }/>
                </Paper>
                <h5>Files to upload (Drag and drop files - png, jpeg)</h5>
                <Paper>
                    <Dropzone className="custom-dropzone" style={dropzoneContainerStyle} onDrop={this.onDrop.bind(this)} accept="image/jpeg, image/png" onDragEnter={this.onDragEnter.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                        { this.state.dropzoneActive && <div className="overlay">Drop files...</div> }
                        { this.state.files.length === NO_ELEMENTS && this.state.filesOnFirebase.length === NO_ELEMENTS && <p className="dropzone-info">No files to upload yet</p> }
                        {
                            this.state.filesOnFirebase &&
                            this.state.filesOnFirebase.map((file, index) => {
                                const { poiContentId, urlXs, _idx } = file;

                                return (<span key={_idx} onClick={(event) => {
                                    event.preventDefault();
                                    // Stop event propagation to Dropzone event handler
                                    event.stopPropagation();

                                    const filesDeleted = this.state.filesDeleted.slice(FIRST_ELEMENT_INDEX),
                                        filesOnFirebase = this.state.filesOnFirebase.slice(FIRST_ELEMENT_INDEX);

                                    filesOnFirebase.splice(index, ONE_ELEMENT);
                                    filesDeleted.push(poiContentId);
                                    this.setState({
                                        filesDeleted,
                                        filesOnFirebase
                                    });
                                }}>
                                            <div className="dropzone-thumbnail-container">
                                                <Image url={urlXs} className="dropzone-thumbnail" withLoader/>
                                                <i className="fa fa-trash dropzone-delete-icon" aria-hidden="true"/>
                                            </div>
                                </span>);
                            })
                        }
                        {
                            this.state.files &&
                            this.state.files.map((file, index) => {
                                const { preview, _idx } = file;

                                /*
                                 * Children components must have a unique key, due to re-render purposes.
                                 * If offset is switched with the above, unnecessary re-renders are performed.
                                 */
                                return (<span key={_idx} onClick={(event) => {
                                    event.preventDefault();
                                    // Stop event propagation to Dropzone event handler
                                    event.stopPropagation();

                                    const files = this.state.files.slice(FIRST_ELEMENT_INDEX);
                                    files.splice(index, ONE_ELEMENT);
                                    window.URL.revokeObjectURL(preview);
                                    this.setState({ files });
                                }}>
                                            <div className="dropzone-thumbnail-container">
                                                <img src={preview} className="dropzone-thumbnail" />
                                                <i className="fa fa-trash dropzone-delete-icon" aria-hidden="true"/>
                                            </div>
                                </span>);
                            })
                        }
                    </Dropzone>
                </Paper>
                { /* onTouchTap is not required: the button is inside a form, with a defined submit behaviour */ }
                <div style={buttonContainerStyle}>
                <RaisedButton style={ buttonStyle } label="Submit" primary disabled={ submitInProgress } onTouchTap={ this.handleSubmit.bind(this) }/>
                { deleteButton }
                </div>
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
    initialValues: PropTypes.object,
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
    resetAfterSubmit: PropTypes.bool,
    zoom: PropTypes.number
};