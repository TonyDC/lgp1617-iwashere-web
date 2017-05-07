import React, { Component } from "react";
import PropTypes from "prop-types";
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import { Card, CardTitle } from "material-ui/Card";
import { GridLoader as Loader } from 'halogen';
import InfiniteScroll from 'react-infinite-scroller';
import Alerts from "../utils/Alerts";
import PostMosaic from "./PostMosaic";
import { GridList } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import { red500 as currentLocationColor } from "material-ui/styles/colors";
import MapsMyLocation from "material-ui/svg-icons/maps/my-location";
import NoLocation from "material-ui/svg-icons/device/gps-off";

import "styles/suggestions.scss";

const API_POI_SUGGESTIONS_URL = 'api/poi/suggestions';
const LIMIT = 20;
const TITLE = 'Feed';
const USING_LOCATION_TOOLTIP = 'Using your location';

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
            suggestions: [],
            suggestionsOffset: 0
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.getCurrentLocation();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
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
                firebase.auth().onAuthStateChanged((user) => {
                    if (this.componentIsMounted) {
                        this.setState({ user }, () => {
                            this.fetchSuggestions();
                        });
                    }
                });
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

        let url = API_POI_SUGGESTIONS_URL;

        if (this.user) {
            url += `/${this.state.uid}`;
        }

        url += `/${this.state.suggestionsOffset}/${LIMIT}`;

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
        then((newSuggestions) => {
            if (!this.componentIsMounted) {
                return;
            }

            const suggestions = this.state.suggestions.concat(newSuggestions);
            const suggestionsOffset = this.state.suggestionsOffset + newSuggestions.length;

            this.setState({
                hasMoreSuggestions: newSuggestions.length === LIMIT,
                suggestions,
                suggestionsOffset
            });
        });
    }

    selectMosaic(poiId) {
        // open post modal
    }

    dismissMosaic(poiId) {
        this.props.router.push(`/poi/${poiId}`);
    }

    getPoiMosaics() {
        return this.state.suggestions.map((poi) => {
            return <PostMosaic
                key={poi.poiId}
                poi={poi}
                onSelect={() => {
                    this.selectMosaic(poi.poiId);
                }}
                onDismiss={() => {
                    this.dismissMosaic(poi.poiId);
                }}/>;
        });
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

        const loader =
            <div className="hor-align vert-align">
                <Loader color="#012935" className="loader"/>
            </div>;

        return (
            <Card className="suggestions-card">
                {locationIcon}
                <CardTitle title={TITLE}/>
                <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={this.fetchSuggestions.bind(this)}
                    hasMore={this.state.hasMoreSuggestions}
                    loader={loader}>
                    <GridList style={gridStyle}>
                        {poiSuggestions}
                    </GridList>
                </InfiniteScroll>
            </Card>
        );
    }
}

POISuggestions.defaultProps = { style: DEFAULT_STYLE };

POISuggestions.propTypes = {
    router: PropTypes.object,
    style: PropTypes.object
};
