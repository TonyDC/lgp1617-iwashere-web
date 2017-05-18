import React, { Component } from 'react';
import PropTypes from 'prop-types';
import httpCodes from 'http-status-codes';
import * as firebase from 'firebase';
import Alerts from '../../../utils/Alerts';

import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import RouteForm from './RouteForm';

import 'styles/utils.scss';
import 'styles/map.scss';

const API_ROUTE_URL = '/api/reserved/content-editor/route/';
const ONE_SIZE = 1;

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class CreateRoute extends Component {

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
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

    createRoute(route) {
        const userLoggedIn = firebase.auth().currentUser;
        if (this.componentIsMounted && userLoggedIn) {
            if (!this.checkRoute(route)) {
                return;
            }

            // TODO change this:
            route.context = 3;
            console.error(route);

            this.setState({ inProgress: true });

            userLoggedIn.getToken().then((token) => {
                return fetch(API_ROUTE_URL, {
                    body: JSON.stringify(route),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-user-context': 1 // TODO obter o context seleccionado pelo utilizador
                    },
                    method: 'POST'
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
            catch((error) => {
                if (!this.componentIsMounted) {
                    return;
                }
                console.log(error);

                this.setState({ inProgress: false });
                this.errorAlert = Alerts.createErrorAlert('Error while creating the new route.');
            });
        }
    }

    render() {
        return (
            <Paper zDepth={2} style={mainStyle}>
                <Helmet>
                    <title>#iwashere - Reserved - Route</title>
                </Helmet>
                <RouteForm onSave={this.createRoute.bind(this)}
                           router={this.props.router}
                           title="Create a route" />
            </Paper>
        );
    }
}

CreateRoute.propTypes = { router: PropTypes.object };
