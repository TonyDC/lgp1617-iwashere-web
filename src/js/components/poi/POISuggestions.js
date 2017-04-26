import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import Alerts from '../utils/Alerts';
import POIMosaic from './POIMosaic';

import 'styles/timeline.scss';

const httpCodes = require('http-status-codes');
const API_POI_SUGGESTIONS_URL = 'api/poi/suggestions';
const MOSAIC_SIZE = 4;
const TWO = 2;
const NO_ELEMENT_SIZE = 0;

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
        this.componentIsMounted = true;

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
            if (!this.componentIsMounted) {
                return;
            }

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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((response) => {
            if (!this.componentIsMounted) {
                return;
            }

            const suggestions = this.state.suggestions.concat(response);
            const limitSuggestions = suggestions.length * TWO;

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

                if (!this.componentIsMounted) {
                    return;
                }

                this.setState({
                    previousSuggestions,
                    suggestions
                });
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
            <GridList cols={MOSAIC_SIZE / TWO} rows={MOSAIC_SIZE / TWO} style={this.props.style}>
                {poiSuggestions}
            </GridList>
        );
    }
}

POISuggestions.defaultProps = {
    style: {
        height: 450,
        overflowY: 'auto',
        width: 500
    }
};

POISuggestions.propTypes = {
    router: PropTypes.object,
    style: PropTypes.object,
    user: PropTypes.any
};
