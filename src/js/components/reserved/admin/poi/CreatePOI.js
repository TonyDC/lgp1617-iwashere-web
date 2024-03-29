import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Helmet from 'react-helmet';
import POIForm from './POIForm';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';
import { getContext } from '../../../../functions/store';

import 'styles/utils.scss';
import 'styles/map.scss';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

const titleDividerStyle = { width: "auto" };

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

    getFormData(data) {
        const { name, address, description, tags, metaInfo, location, files, selectedType, contextId } = data;
        const form = new FormData();
        form.append('name', name);
        form.append('address', address);
        form.append('description', description);
        form.append('tags', JSON.stringify(tags));
        form.append('metaInfo', metaInfo);
        form.append('latitude', location.lat);
        form.append('longitude', location.lng);
        form.append('poiTypeId', selectedType);
        form.append('context', contextId ? contextId : getContext(this.context.store));
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            // Note: In order to detect the array of files in the server, each file, individually, must be appended to the same form key.
            form.append('poiFiles', files[fileIndex]);
        }

        return form;
    }

    handleSave(data) {
        if (!firebase.auth().currentUser) {
            throw new Error('Bad user object');
        }

        const { contexts, selectedIndex: selectedContextIndex } = this.context.store.getState().reserved;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected');
        }

        // 'Content-Type': `multipart/form-data` must not be added; the 'boundary' token must be provided automatically
        const headers = { 'X-user-context': contexts[selectedContextIndex].contextId };

        return authenticatedFetch('/api/reserved/content-editor/poi/', this.getFormData(data), headers, 'POST').
        then(checkFetchResponse);
    }

    render() {
        const { router } = this.props;

        return (
            <div className="colorPrimary wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
                    <Helmet>
                        <title>#iwashere - Create POI</title>
                    </Helmet>
                    <h3 style={titleStyle}>Create POI</h3>
                    <Divider style={titleDividerStyle}/>
                    <POIForm onSave={ this.handleSave.bind(this) } resetAfterSubmit userContext={ getContext(this.context.store) } router={router}/>
                </Paper>
            </div>
        );
    }
}

CreatePOI.propTypes = { router: PropTypes.object.isRequired };

CreatePOI.contextTypes = { store: PropTypes.object };
