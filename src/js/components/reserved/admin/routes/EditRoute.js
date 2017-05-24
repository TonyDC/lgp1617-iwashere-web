import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import firebase from 'firebase';
import nProgress from 'nprogress';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';
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

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class EditRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

    getContext() {
        const { reserved: reservedPropStore } = this.context.store.getState();
        const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
        if (!contexts || !Array.isArray(contexts) || typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
            throw new Error('Bad user context selected.');
        }

        return contexts[selectedContextIndex].contextId;
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
            'X-user-context': this.getContext()
        };

        authenticatedFetch(`${API_ROUTE_URL}${this.props.params.id}`, {}, headers, 'GET').
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
            'X-user-context': this.getContext()
        };

        authenticatedFetch(`${API_ROUTE_URL}pois/${this.props.params.id}`, {}, headers, 'GET').
        then((response) => {
            return checkFetchResponse(response, true);
        }).
        then((routePois) => {
            if (routePois && this.componentIsMounted) {
                const { route } = this.state;
                route.pois = routePois.map((poi) => {
                    return `${poi.poiId}`;
                });

                this.setState({
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
        const { currentUser } = firebase.auth();
        if (currentUser && this.componentIsMounted) {
            if (!this.checkRoute(route)) {
                return;
            }

            this.setState({ inProgress: true });
            nProgress.start();

            const headers = {
                'Content-Type': 'application/json',
                'X-user-context': this.getContext()
            };

            authenticatedFetch(API_ROUTE_URL, JSON.stringify(route), headers, 'PUT').
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
        if (currentUser && this.componentIsMounted) {

            this.setState({ inProgress: true });

            const headers = {
                'Content-Type': 'application/json',
                'X-user-context': this.getContext()
            };

            authenticatedFetch(`${API_ROUTE_URL}${route.routeId}`,
                JSON.stringify(route), headers, 'POST').
            then((response) => {
                checkFetchResponse(response, true, false).then(() => {
                    this.setState({ inProgress: false });
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
                                   userContext={this.getContext()}
                                   onSave={this.saveRoute.bind(this)}
                                   onDelete={this.deleteRoute.bind(this)}
                                   route={this.state.route}
                                   router={this.props.router}
                                   title="Edit a route" />;
        }

        return (
            <div className="wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
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
