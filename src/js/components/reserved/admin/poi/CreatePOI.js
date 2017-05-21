import React, { Component } from 'react';
import firebase from 'firebase';
import httpCodes from 'http-status-codes';

import Helmet from 'react-helmet';

import Paper from 'material-ui/Paper';

import POIForm from './POIForm';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

const titleStyle = { marginLeft: 40 };

export default class POIArea extends Component {

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

        return currentUser.getToken().then((token) => {
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
            return fetch('/api/reserved/content-editor/poi/', {
                body: form,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-user-context': 1                                 // TODO obter o context seleccionado pelo utilizador
                },
                method: 'POST'
            });
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            // The API will return the ID of the newly created POI
            return null;
        }).
        catch((err) => {
            return Promise.reject(new Error(err));
        });
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
