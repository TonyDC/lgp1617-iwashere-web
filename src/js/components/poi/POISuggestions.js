import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alerts from '../utils/Alerts';

import 'styles/timeline.scss';

const API_POI_SUGGESTIONS_URL = 'api/poi/suggestions';
const MOSAIC_SIZE = 4;
const LIMIT = 20;
const NO_ELEMENT_SIZE = 0;

export default class POISuggestions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreSuggestions: true,
            limitSuggestions: LIMIT,
            previousSuggestions: [],
            suggestions: []
        };
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 20000
        };

        const locationInProgressAlert = Alerts.createInfoAlert(`Retrieving location...`);
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            this.setState({
                location: {
                    lat: latitude,
                    lng: longitude
                }
            }, () => {
                this.fetchSuggestions();
            });

            Alerts.close(locationInProgressAlert);
            Alerts.createInfoAlert(`Location found.`);
        }, () => {
            Alerts.closeAll();
            Alerts.createErrorAlert('Error while retrieving current location.');
        }, geoOptions);

    }

    fetchSuggestions() {
        if (!this.state.hasMoreSuggestions) {
            return;
        }

        fetch(`${API_POI_SUGGESTIONS_URL}/${this.state.limitSuggestions}/${this.state.location.lat}/${this.state.location.lng}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            const suggestions = this.state.suggestions.concat(response);
            const limitSuggestions = suggestions.length * 2;

            this.setState({
                hasMoreSuggestions: suggestions.length === LIMIT,
                limitSuggestions,
                suggestions
            }, () => {
                this.updateSuggestions();
            });
        });
    }

    updateSuggestions() {
        const { suggestions, previousSuggestions } = this.state;

        if (suggestions.length < MOSAIC_SIZE) {
            if (this.state.hasMoreSuggestions) {
                this.fetchSuggestions();
            } else {
                while (suggestions.length < MOSAIC_SIZE && previousSuggestions.length > NO_ELEMENT_SIZE) {
                    const newSuggestion = suggestions.shift();
                    suggestions.push(newSuggestion);
                }
            }
        }
    }

    selectMosaic(poiId) {
        this.props.router.push(`/poi/${poiId}`);
    }

    dismissMosaic(poiId) {
        const { previousSuggestions } = this.state;
        let { suggestions } = this.state;

        suggestions.forEach((poi) => {
            if (poi.poiId === poiId) {
                previousSuggestions.push(poi);
            }
        });

        suggestions = suggestions.filter((poi) => {
            return poi.poiId === poiId;
        });

        this.setState({
            previousSuggestions,
            suggestions
        }, () => {
            this.updateSuggestions();
        });
    }

    getPoiMosaics() {
        const suggestions = this.state.suggestions.slice();
        const mosaics = [];

        while (mosaics.length < MOSAIC_SIZE && suggestions.length > NO_ELEMENT_SIZE) {
            const poi = suggestions.shift();
            mosaics.push(<POISuggestions
                            poi={poi}
                            onSelect={() => {
                                this.selectMosaic(poi.poiId);
                            }}
                            onDismiss={() => {
                                this.dismissMosaic(poi.poiId);
                            }}
                        />);
        }

        while (mosaics.length < MOSAIC_SIZE) {
            mosaics.push(<POISuggestions/>);
        }

        return mosaics;
    }

    render() {
        const poiSuggestions = this.getPoiMosaics();

        return (
            <GridList cellHeight={180} >
                {poiSuggestions}
            </GridList>
        );
    }
}

POISuggestions.propTypes = {
    poiId: PropTypes.any.isRequired,
    router: PropTypes.object,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
