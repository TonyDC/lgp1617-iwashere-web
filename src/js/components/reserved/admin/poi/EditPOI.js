import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import firebase from 'firebase';
import httpCodes from 'http-status-codes';
import Alerts from '../../../utils/Alerts';
import Helmet from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import POIForm from './POIForm';

import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';
import { getContext } from '../../../../functions/store';

import 'styles/utils.scss';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

const titleDividerStyle = { width: "auto" };

export default class EditPOI extends Component {

    constructor(props) {
        super(props);
        this.state = { fetchInProgress: true };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchPOIInfo();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPOIInfo() {
        const { router } = this.props;
        const { poiID } = router.params;
        nProgress.start();

        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected');
        }

        const headers = {
            'Accept': 'application/json',
            'X-user-context': contexts[selectedContextIndex].contextId
        };

        return authenticatedFetch(`/api/reserved/content-editor/poi/${encodeURIComponent(poiID)}`, null, headers, 'GET').
        then(checkFetchResponse).
        then((json) => {
            const { poiId, name, address, description, metaInfo, poiTypeId, tags, latitude, longitude, deleted, contents, contextId } = json;
            this.setState({
                fetchInProgress: false,
                poi: {
                    address,
                    contextId,
                    deleted,
                    description,
                    filesOnFirebase: contents,
                    location: {
                        lat: latitude,
                        lng: longitude
                    },
                    metaInfo,
                    name,
                    poiId,
                    selectedType: poiTypeId,
                    tags: tags.map((element) => {
                        return element.tagId;
                    })
                }
            });

            // Note: so that the fetched information and the submitted information are related to the same POI
            this.poiID = poiID;

            return null;
        }).
        catch((err) => {
            const { status } = err;
            const text = (status === httpCodes.UNAUTHORIZED)
                    ? 'Error while fetching POI information. Please, try again later.'
                    : 'You are not allowed to edit the information of this POI.';

            Alerts.createErrorAlert(text);
        }).
        then(() => {
            nProgress.done();
        });
    }

    getFormData(data) {
        const { name, address, description, tags, metaInfo, location, files, selectedType, contextId, filesDeleted } = data;

        const form = new FormData();
        form.append('name', name);
        form.append('address', address);
        form.append('description', description);
        form.append('tags', JSON.stringify(tags));
        form.append('metaInfo', metaInfo);
        form.append('latitude', location.lat);
        form.append('longitude', location.lng);
        form.append('poiTypeId', selectedType);
        form.append('filesDeleted', JSON.stringify(filesDeleted));
        form.append('context', contextId);
        // add parent...

        // New files to be added
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            // Note: In order to detect the array of files in the server, each file, individually, must be appended to the same form key.
            form.append('poiFiles', files[fileIndex]);
        }

        return form;
    }

    handleSave(data) {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            throw new Error('Bad user object');
        }

        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected');
        }

        const { poiID } = this;

        // 'Content-Type': `multipart/form-data` must not be added; the 'boundary' token must be provided automatically
        const headers = { 'X-user-context': contexts[selectedContextIndex].contextId };

        return authenticatedFetch(`/api/reserved/content-editor/poi/${encodeURIComponent(poiID)}`, this.getFormData(data), headers, 'PUT').
        then(checkFetchResponse);
    }

    handleDelete(toDelete) {
        const { poiID } = this;
        if (!poiID) {
            throw new Error('Bad POI ID');
        }

        if (typeof toDelete !== 'boolean') {
            throw new Error('Bad parameter (it should be a boolean value)');
        }

        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected');
        }

        const body = JSON.stringify({ deleted: toDelete }),
            headers = {
                'Content-Type': 'application/json',
                'X-user-context': contexts[selectedContextIndex].contextId
            };

        return authenticatedFetch(`/api/reserved/content-editor/poi/${encodeURIComponent(poiID)}`, body, headers, 'POST').
        then(checkFetchResponse);
    }

    render() {
        const { router } = this.props;
        const { poi, fetchInProgress } = this.state;

        let poiForm = null;
        if (fetchInProgress === false && poi) {
            poiForm = (
                <POIForm
                    router={router}
                    initialValues={ this.state.poi }
                    onSave={ this.handleSave.bind(this) }
                    onDelete={ this.handleDelete.bind(this) }
                    userContext={ getContext(this.context.store) }/>
            );
        } else {
            poiForm = (<div className="hor-align">
                <Loader color="#012935" className="loader"/>
            </div>);
        }

        return (
            <div className="colorPrimary wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
                    <Helmet>
                        <title>#iwashere - Edit POI</title>
                    </Helmet>
                    <h3 style={titleStyle}>Edit POI</h3>
                    <Divider style={titleDividerStyle}/>
                    { poiForm }
                </Paper>
            </div>
        );
    }
}

EditPOI.propTypes = { router: PropTypes.object.isRequired };

EditPOI.contextTypes = { store: PropTypes.object };
