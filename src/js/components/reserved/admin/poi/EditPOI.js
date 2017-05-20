import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import firebase from 'firebase';
import Alerts from '../../../utils/Alerts';
import httpCodes from 'http-status-codes';

import Helmet from 'react-helmet';

import Paper from 'material-ui/Paper';

import POIForm from './POIForm';

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

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

    // TODO ao buscar a informação, ver se o utilizador está autorizado a acedê-la
    fetchPOIInfo() {
        const { router } = this.props;
        const { poiID } = router.params;
        fetch(`/api/poi/${encodeURIComponent(poiID)}`).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error('Error while fetching POI information'));
            }

            return response.json();
        }).
        then((json) => {
            const { name, address, description, poiTypeId, tags, latitude, longitude } = json;
            this.setState({
                poi: {
                    address,
                    description,
                    location: {
                        lat: latitude,
                        lng: longitude
                    },
                    name,
                    selectedType: poiTypeId,
                    tags: tags.map((element) => {
                        return element.tagId;
                    })
                }
            });

            // Note: so that the fetched information and the submitted information are related to the same POI
            this.poiID = poiID;

            return fetch(`/api/poi/media/${encodeURIComponent(poiID)}`);
        }).
        catch((err) => {
            console.error(err);
            Alerts.createErrorAlert('Error while fetching POI information. Please, try again later.');
            this.props.router.push('/reserved/dash/poi');
        });
    }

    handleSave(data) {
        nProgress.start();
        const { currentUser } = firebase.auth();
        if (!currentUser) {
            nProgress.done();
            throw new Error('Bad user object');
        }

        return currentUser.getToken().then((token) => {
            const { poiID } = this;
            const { name, address, description, tags, metaInfo, location, files, selectedType } = data;

            const form = new FormData();
            form.append('name', name.trim());
            form.append('address', address.trim());
            form.append('description', description.trim());
            form.append('tags', JSON.stringify(tags));
            form.append('metaInfo', metaInfo.trim());
            form.append('latitude', location.lat);
            form.append('longitude', location.lng);
            form.append('poiTypeId', selectedType);
            form.append('context', 3);                                  // TODO Obter a lista de contextos disponíveis para o utilizador
            for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
                // Note: In order to detect the array of files in the server, each file, individually, must be appended to the same form key.
                form.append('postFiles', files[fileIndex]);
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

            Alerts.createInfoAlert('POI created successfully');
            nProgress.done();

            // The API will return the ID of the newly created POI
            return null;
        }).
        catch((err) => {
            nProgress.done();
            if (this.formFetchError) {
                Alerts.close(this.formFetchError);
                this.formFetchError = null;
            }
            this.formFetchError = Alerts.createErrorAlert('Error in submitting the information. Please, try again later.');

            return Promise.reject(new Error(err));
        });
    }

    handleDelete() {
        const { poiID } = this.props.router.params;
        // TODO
    }

    render() {
        const { poi, fetchInProgress } = this.state;

        let poiForm = null;
        if (fetchInProgress === false && poi) {
            poiForm = (
                <POIForm
                    initialValues={ this.state.poi }
                    onEdit={ this.handleSave.bind(this) }
                    onDelete={ this.handleDelete.bind(this) }
                />
            );
        }

        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Edit POI</title>
                </Helmet>

                { poiForm }
            </Paper>
        );
    }
}

EditPOI.propTypes = { router: PropTypes.object.isRequired };
