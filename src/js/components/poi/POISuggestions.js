import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList } from "material-ui/GridList";
import { Card, CardTitle } from "material-ui/Card";
import Alerts from "../utils/Alerts";
import POIMosaic from "./POIMosaic";
import IconButton from "material-ui/IconButton";
import { red500 as currentLocationColor } from "material-ui/styles/colors";
import MapsMyLocation from "material-ui/svg-icons/maps/my-location";
import NoLocation from "material-ui/svg-icons/device/gps-off";

import "styles/suggestions.scss";

const httpCodes = require('http-status-codes');
const API_POI_SUGGESTIONS_URL = 'api/poi/suggestions';
const MOSAIC_SIZE = 4;
const TWO = 2;
const THREE = 3;
const NO_ELEMENT_SIZE = 0;
const POI_SUGGESTION_TITLE = 'Points of interest';
const USING_LOCATION_TOOLTIP = 'Using your location';
const DEFAULT_SPACING = 2;

const DEFAULT_STYLE = {
    height: 500,
    overflowX: 'auto',
    overflowY: 'auto',
    width: 500
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
        const { suggestions, previousSuggestions } = this.state;

        if (suggestions.length < MOSAIC_SIZE) {
            if (this.state.hasMoreSuggestions) {
                this.fetchSuggestions();
            } else {
                while (suggestions.length < MOSAIC_SIZE && previousSuggestions.length > NO_ELEMENT_SIZE) {
                    const newSuggestion = previousSuggestions.shift();
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
            return poi.poiId !== poiId;
        });

        if (!this.componentIsMounted) {
            return;
        }

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

    overrideStyle(originalStyle, newStyle) {
        const newObject = {};

        for (const attribute in originalStyle) {
            if (attribute in newStyle) {
                newObject[attribute] = newStyle[attribute];
            } else {
                newObject[attribute] = originalStyle[attribute];
            }
        }

        return newObject;
    }

    render() {
        let gridStyle = DEFAULT_STYLE;
        if (this.props.style) {
            gridStyle = this.overrideStyle(gridStyle, this.props.style);
        }

        gridStyle.width -= THREE * DEFAULT_SPACING;
        gridStyle.height -= THREE * DEFAULT_SPACING;
        const cellHeight = gridStyle.width / (MOSAIC_SIZE / TWO);

        const poiSuggestions = this.getPoiMosaics();

        let locationIcon = null;
        if (this.state.location) {
            locationIcon =
                <IconButton className="location-icon" tooltipPosition="top-left" tooltip={USING_LOCATION_TOOLTIP}>
                    <MapsMyLocation color={ currentLocationColor }/>
                </IconButton>;
        } else {
            locationIcon =
                <IconButton className="location-icon" tooltipPosition="top-left" tooltip={USING_LOCATION_TOOLTIP}>
                    <NoLocation/>
                </IconButton>;
        }

        return (
            <Card className="suggestions-card">
                {locationIcon}
                <CardTitle title={POI_SUGGESTION_TITLE}/>
                <GridList cols={MOSAIC_SIZE / TWO} rows={MOSAIC_SIZE / TWO} style={gridStyle} cellHeight={cellHeight}>
                    {poiSuggestions}
                </GridList>
            </Card>
        );
    }
}

POISuggestions.defaultProps = { style: DEFAULT_STYLE };

POISuggestions.propTypes = {
    router: PropTypes.object,
    style: PropTypes.object,
    user: PropTypes.any
};
