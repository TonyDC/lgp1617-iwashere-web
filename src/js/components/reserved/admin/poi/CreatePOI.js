import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import Helmet from 'react-helmet';

import Paper from 'material-ui/Paper';

import POIForm from './POIForm';

import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

export default class CreatePOI extends Component {

    constructor(props) {
        super(props);
        this.state = { searchText: '' };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
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

        const { name, address, description, tags, metaInfo, location, files, selectedType } = data;

        const form = new FormData();
        form.append('name', name.trim());
        form.append('address', address.trim());
        form.append('description', description.trim());
        form.append('tags', JSON.stringify(tags));
        form.append('metaInfo', metaInfo.trim());                   // TODO database
        form.append('latitude', location.lat);
        form.append('longitude', location.lng);
        form.append('poiTypeId', selectedType);
        form.append('context', 3);                                  // TODO Obter a lista de contextos disponíveis para o utilizador
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            // Note: In order to detect the array of files in the server, each file, individually, must be appended to the same form key.
            form.append('poiFiles', files[fileIndex]);
        }

        // 'Content-Type': `multipart/form-data` must not be added; the 'boundary' token must be provided automatically
        const headers = { 'X-user-context': contexts[selectedContextIndex].contextId };

        return authenticatedFetch('/api/reserved/content-editor/poi/', form, headers, 'POST').
        then(checkFetchResponse);
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Create POI</title>
                </Helmet>

                <h3 style={titleStyle}>Create POI</h3>
                <POIForm onSave={ this.handleSave.bind(this) } resetAfterSubmit/>
            </Paper>
        );
    }
}

CreatePOI.contextTypes = { store: PropTypes.object };
