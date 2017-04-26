import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import Alerts from '../utils/Alerts';
import POIMosaic from './POIMosaic';

import 'styles/timeline.scss';

const API_POI_SUGGESTIONS_URL = 'api/poi/suggestions';
const MOSAIC_SIZE = 4;
const DOUBLE = 2;
const NO_ELEMENT_SIZE = 0;

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

export default class POISuggestions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMoreSuggestions: true,
            limitSuggestions: 20,
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

        let url = `${API_POI_SUGGESTIONS_URL}/${this.state.limitSuggestions}`;

        if (this.state.location) {
            url += `/${this.state.location.lat}/${this.state.location.lng}`;
        }

        /**
        if (this.state.user) {
            url += `/${this.state.user.uid}`;
        }
        */

        fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            const suggestions = this.state.suggestions.concat(response);
            const limitSuggestions = suggestions.length * DOUBLE;

            this.setState({
                hasMoreSuggestions: suggestions.length === this.state.limitSuggestions,
                limitSuggestions,
                suggestions
            }, () => {
                this.updateSuggestions();
            });
        });
    }

    updateSuggestions() {
        console.log('suggestions updated');
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
            mosaics.push(<POIMosaic
                key={poi.poiId}
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
            mosaics.push(<POIMosaic key={`null-mosaic#${mosaics.length}`} />);
        }

        return mosaics;
    }

    render() {
        const poiSuggestions = this.getPoiMosaics();

        return (
            <div style={styles.root}>
                <GridList cellHeight={180} style={styles.gridList}>
                    {poiSuggestions}
                </GridList>
            </div>
        );
    }
}

POISuggestions.propTypes = {
    router: PropTypes.object,
    user: PropTypes.any
};
