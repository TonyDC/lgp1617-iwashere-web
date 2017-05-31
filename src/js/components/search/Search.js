import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import validator from 'validator';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import Alerts from '../utils/Alerts';
import { checkFetchResponse } from '../../functions/fetch';
import { processLocation } from '../../functions/location';

import 'styles/panel.scss';
import 'styles/utils.scss';

const NO_ELEMENTS = 0;
const MAX_SIZE = 3;

const notFoundItemStyle = {
    backgroundColor: '#f0f0f0',
    borderRadius: 5
};

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            poiResults: null,
            routeResults: null,
            search: '',
            searchError: false
        };
    }

    componentWillMount() {
        const { search } = this.props.params;
        if (search) {
            this.setState({ search: decodeURI(this.props.params.search) });
        }
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.geolocationSupport = "geolocation" in navigator;
        if (!this.geolocationSupport) {
            Alerts.createWarningAlert('The browser does not support geo-location. The results will not consider the current location.');
        }
        const { search } = this.props.params;
        if (search) {
            this.submitSearch();
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    handleSearchInput(event) {
        if (this.componentIsMounted) {
            this.setState({
                search: event.target.value,
                searchError: false
            });
        }
    }

    performPOISearch(query) {
        if (this.geolocationSupport) {
            const geoOptions = {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 10000
            };

            return processLocation(geoOptions).
            then((position) => {
                if (!this.componentIsMounted) {
                    return null;
                }
                const { latitude, longitude } = position.coords;

                return this.handlePOISearch(query, latitude, longitude);
            }).
            catch(() => {
                if (!this.componentIsMounted) {
                    return null;
                }
                Alerts.createWarningAlert('Unable to find the current location. The results will not consider the current location.');

                return this.handlePOISearch(query);
            });
        }

        return this.handlePOISearch(query);
    }

    handlePOISearch(query, lat, lng) {
        return new Promise((fulfill, reject) => {
            let entrypoint = `/api/poi/search?query=${query}&lat=${lat}&lng=${lng}`;
            if (typeof lat === 'undefined' || typeof lng === 'undefined') {
                entrypoint = `/api/poi/search?query=${query}`;
            }

            fetch(entrypoint, {
                headers: { 'Accept': 'application/json' },
                method: 'GET'
            }).
            then(checkFetchResponse).
            then((response) => {
                if (response && response.results) {
                    fulfill(response.results);
                } else {
                    fulfill(null);
                }
            }).
            catch((error) => {
                reject(error);
            });
        });
    }

    performRouteSearch(query) {
        return new Promise((fulfill, reject) => {
            fetch(`/api/route/search?query=${query}`, {
                headers: { 'Accept': 'application/json' },
                method: 'GET'
            }).
            then(checkFetchResponse).
            then((results) => {
                if (results) {
                    fulfill(results);
                } else {
                    fulfill(null);
                }
            }).
            catch((error) => {
                reject(error);
            });
        });
    }

    performSearch(query) {
        if (this.componentIsMounted) {
            nProgress.start();
            this.setState({ inProgress: true });

            Promise.all([this.performPOISearch(query), this.performRouteSearch(query)]).
            then((results) => {
                if (!this.componentIsMounted) {
                    return;
                }
                const [poiResults, routeResults] = results;
                this.setState({
                    inProgress: false,
                    poiResults: poiResults ? poiResults : [],
                    routeResults: routeResults ? routeResults : []
                });
            }).
            catch(() => {
                if (!this.componentIsMounted) {
                    return;
                }
                Alerts.createErrorAlert('An error occurred while searching.');
                this.setState({ inProgress: false });
            }).
            then(() => {
                nProgress.done();
            });
        }
    }

    submitSearch(event) {
        event.preventDefault();
        if (this.componentIsMounted) {
            let { search } = this.state;
            search = search.trim();
            this.setState({ search });
            if (typeof search !== 'string' || validator.isEmpty(search)) {
                this.setState({ searchError: true });
            } else {
                this.performSearch(encodeURIComponent(search));
            }
        }
    }

    getPoiResult(poi) {
        return (
            <div key={poi.poiId}>
                <ListItem
                    primaryText={ poi.name } secondaryText={ <p>{ poi.address }</p> } secondaryTextLines={2}
                    onTouchTap={(event) => {
                        event.preventDefault();
                        this.props.router.push(`/poi/${poi.poiId}`);
                    }}/>
                <Divider inset/>
            </div>
        );
    }

    getRouteResult(route) {
        return (
            <div key={route.routeId}>
                <ListItem primaryText={ route.name } secondaryText={ <p>{ route.description }</p> } secondaryTextLines={2}
                    onTouchTap={() => {
                        this.props.router.push(`/route/${route.routeId}`);
                    }}
                />
                <Divider inset/>
            </div>
        );
    }

    getResultsArea(results, resultFunction) {
        let resultsArea = (
            <List>
                <ListItem style={notFoundItemStyle} primaryText="No results were found." secondaryText={ <p>Try a different search...</p> } disabled secondaryTextLines={2}/>
            </List>
        );

        if (results && Array.isArray(results) && results.length > NO_ELEMENTS) {
            const resultsList = results.map((element) => {
                return resultFunction(element);
            });

            if (results.length > MAX_SIZE) {
                resultsArea = (
                    <List>
                        <InfiniteScroll containerHeight={200} elementHeight={40}>
                            { resultsList }
                        </InfiniteScroll>
                    </List>
                );
            } else {
                resultsArea = (
                    <List>
                        { resultsList }
                    </List>
                );
            }
        }

        return resultsArea;
    }

    renderResultsArea() {
        const { poiResults, routeResults } = this.state;

        if (poiResults === null && routeResults === null) {
            return null;
        }

        return (
            <div>
                <div>
                    <h4>Points of Interest</h4>
                    { this.getResultsArea(poiResults, this.getPoiResult.bind(this)) }
                </div>
                <div>
                    <h4>Routes</h4>
                    { this.getResultsArea(routeResults, this.getRouteResult.bind(this)) }
                </div>
            </div>
        );
    }

    render() {
        const { inProgress, search, searchError } = this.state;

        return (
            <div className="colorAccentSecondary wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width main-style" zDepth={2}>
                    <Helmet>
                        <title>#iwashere - Search</title>
                    </Helmet>
                    <form onSubmit={ inProgress ? null : this.submitSearch.bind(this) } className="paper-content">
                        <TextField autoComplete="off" hintText="Keywords" floatingLabelText="Input keywords to search" value={ search } onChange={ this.handleSearchInput.bind(this) } fullWidth
                            errorText={ searchError ? 'Invalid search terms.' : null }/>
                        <br/>
                        <RaisedButton label="Search" icon={<ActionSearch />} onTouchTap={ this.submitSearch.bind(this) } disabled={inProgress}/>
                        { this.renderResultsArea() }
                    </form>
                </Paper>
            </div>

        );
    }
}

Search.propTypes = {
    params: PropTypes.object,
    router: PropTypes.object.isRequired
};
