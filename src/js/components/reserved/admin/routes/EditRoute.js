import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import firebase from 'firebase';
import nProgress from 'nprogress';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';
import { getContext } from '../../../../functions/store';
import { GridLoader as Loader } from 'halogen';
import Alerts from '../../../utils/Alerts';

import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import RouteForm from './RouteForm';

import 'styles/utils.scss';
import 'styles/map.scss';

const API_ROUTE_URL = '/api/reserved/content-editor/route/';
const DECIMAL_BASE = 10;
const ONE_SIZE = 1;
const ZERO_INDEX = 0;

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class EditRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allPois: [],
            inProgress: false,
            route: { pois: [] },
            routeInfoLoaded: false,
            routePoisLoaded: false
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchRouteInfo();
        this.fetchRoutePois();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
        Alerts.closeAll();
    }

    fetchRouteInfo() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (this.componentIsMounted) {
                this.setState({ error: true });
            }

            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-user-context': getContext(this.context.store)
        };

        authenticatedFetch(`${API_ROUTE_URL}${this.props.params.id}`, null, headers, 'GET').
        then((response) => {
            return checkFetchResponse(response, true);
        }).
        then((routeInfo) => {
            if (routeInfo && this.componentIsMounted) {
                const route = {
                    ...this.state.route,
                    ...routeInfo
                };
                route.tags = routeInfo.tags.map((tag) => {
                    return parseInt(tag.tagId, DECIMAL_BASE);
                });

                this.setState({
                    route,
                    routeInfoLoaded: true
                });
            }
        }).
        catch(() => {
            if (this.componentIsMounted) {
                this.setState({ error: true });
            }
        });
    }

    fetchRoutePois() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (this.componentIsMounted) {
                this.setState({ error: true });
            }

            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-user-context': getContext(this.context.store)
        };

        authenticatedFetch(`${API_ROUTE_URL}pois/${this.props.params.id}`, null, headers, 'GET').
        then((response) => {
            return checkFetchResponse(response, true);
        }).
        then((routePois) => {
            if (routePois && this.componentIsMounted) {
                const { route } = this.state;
                const allPois = routePois.slice(ZERO_INDEX);
                route.pois = routePois.map((poi) => {
                    return `${poi.poiId}`;
                });

                this.setState({
                    allPois,
                    route,
                    routePoisLoaded: true
                });
            }
        }).
        catch((error) => {
            if (this.componentIsMounted) {
                if (error.status === httpCodes.NO_CONTENT) {
                    this.setState({ routePoisLoaded: true });
                } else {
                    this.setState({ error: true });
                }
            }
        });
    }

    checkRoute(route) {
        Alerts.closeAll();
        let errorFound = false;
        route.description = route.description.trim();
        route.name = route.name.trim();

        if (!route.name) {
            Alerts.createErrorAlert("A name for the route must be provided.");
            errorFound = true;
        }
        if (!route.description) {
            Alerts.createErrorAlert("A description for the route must be provided.");
            errorFound = true;
        }
        if (!route.pois || route.pois.length < ONE_SIZE) {
            Alerts.createErrorAlert("At least one point of interest must be associated to the route.");
            errorFound = true;
        }

        return !errorFound;
    }

    saveRoute(route) {
        const updateRoute = { ...route };
        const { currentUser } = firebase.auth();
        if (currentUser && this.componentIsMounted && this.checkRoute(updateRoute)) {
            nProgress.start();
            this.setState({ inProgress: true });

            updateRoute.tags = JSON.stringify(updateRoute.tags);
            updateRoute.contextId = updateRoute.contextId ? updateRoute.contextId : getContext(this.context.store);

            const headers = {
                'Content-Type': 'application/json',
                'X-user-context': getContext(this.context.store)
            };

            authenticatedFetch(API_ROUTE_URL, JSON.stringify(updateRoute), headers, 'PUT').
            then(checkFetchResponse).
            then(() => {
                nProgress.done();
                this.setState({ inProgress: false });
                Alerts.createInfoAlert('Changes to the route saved.');
            }).
            catch(() => {
                nProgress.done();
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    this.errorAlert = Alerts.createErrorAlert('Error while saving the changes to the route.');
                }
            });
        }
    }

    deleteRoute(route, callback) {
        const { currentUser } = firebase.auth();
        const userContext = getContext(this.context.store);
        if (currentUser && userContext && this.componentIsMounted) {

            this.setState({ inProgress: true });

            const headers = {
                'Content-Type': 'application/json',
                'X-user-context': userContext
            };

            authenticatedFetch(`${API_ROUTE_URL}${route.routeId}`, JSON.stringify(route), headers, 'POST').
            then((response) => {
                checkFetchResponse(response, true, false).then(() => {
                    this.setState({ inProgress: false });
                    Alerts.createInfoAlert('Route visibility set.');

                    return callback(true);
                });
            }).
            catch(() => {
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    Alerts.close(this.errorAlert);
                    this.errorAlert = Alerts.createErrorAlert("Error while setting the route's visibility.");
                }

                return callback(false);
            });
        }
    }

    render() {
        let routeForm = <Loader color="#012935" className="loader"/>;
        if (this.state.routeInfoLoaded && this.state.routePoisLoaded) {
            routeForm = <RouteForm inProgress={this.state.inProgress}
                                   userContext={getContext(this.context.store)}
                                   onSave={this.saveRoute.bind(this)}
                                   onDelete={this.deleteRoute.bind(this)}
                                   allPois={this.state.allPois}
                                   route={this.state.route}
                                   router={this.props.router}
                                   title="Edit a route" />;
        }

        return (
            <div className="colorPrimary wrapper-fill vert-align hor-align">
                <Paper className="paper-avg-width" zDepth={2} style={mainStyle}>
                    <Helmet>
                        <title>#iwashere - Reserved - Route</title>
                    </Helmet>
                    {routeForm}
                </Paper>
            </div>
        );
    }
}

EditRoute.contextTypes = { store: PropTypes.object };

EditRoute.propTypes = {
    params: PropTypes.any,
    router: PropTypes.object
};
