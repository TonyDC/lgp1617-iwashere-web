import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import { GridLoader as Loader } from 'halogen';
import Alerts from '../../../utils/Alerts';

import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import RouteForm from './RouteForm';

import 'styles/utils.scss';
import 'styles/map.scss';

const API_ROUTE_URL = '/api/route/auth/';
const DECIMAL_BASE = 10;
const TWO_SIZE = 2;

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class EditRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    fetchRouteInfo() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });

            return;
        }

        fetch(`/api/route/${this.props.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((route) => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({
                route,
                routeInfoLoaded: true
            });
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });
        });
    }

    fetchRoutePois() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });

            return;
        }

        fetch(`/api/route/pois/${this.props.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((routePois) => {
            if (!this.componentIsMounted) {
                return;
            }

            const { route } = this.state;
            route.pois = routePois;
            this.setState({
                route,
                routePoisLoaded: true
            });
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
        if (!route.pois || route.pois.length < TWO_SIZE) {
            Alerts.createErrorAlert("At least two points of interest must be associated to the route.");
            errorFound = true;
        }

        return !errorFound;
    }

    saveRoute(route) {
        const userLoggedIn = firebase.auth().currentUser;
        if (this.componentIsMounted && userLoggedIn) {
            if (!this.checkRoute(route)) {
                return;
            }

            this.setState({ inProgress: true });

            userLoggedIn.getToken().then((token) => {
                return fetch(API_ROUTE_URL, {
                    body: JSON.stringify(route),
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'PUT'
                });
            }).
            then((response) => {
                if (response.status >= httpCodes.BAD_REQUEST || response.status === httpCodes.NO_CONTENT) {
                    return Promise.reject(new Error(response.statusText));
                }

                return response.json();
            }).
            then((newRoute) => {
                this.props.router.push(`/route/${newRoute.routeId}`);
            }).
            catch(() => {
                if (!this.componentIsMounted) {
                    return;
                }

                this.setState({ inProgress: false });
                this.errorAlert = Alerts.createErrorAlert('Error while creating the new route.');
            });
        }
    }

    render() {
        let routeForm = <Loader color="#012935" className="loader"/>;
        if (this.state.routeInfoLoaded && this.state.routePoisLoaded) {
            routeForm = <RouteForm onSave={this.saveRoute.bind(this)}
                                   route={this.state.route}
                                   router={this.props.router}
                                   title="Edit a route" />;
        }

        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Reserved - Route</title>
                </Helmet>
                {routeForm}
            </Paper>
        );
    }
}

EditRoute.propTypes = {
    params: PropTypes.any,
    router: PropTypes.object
};
