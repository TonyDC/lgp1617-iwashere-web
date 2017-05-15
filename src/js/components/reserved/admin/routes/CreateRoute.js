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

const API_ROUTE_URL = '/api/route/auth/';
const TWO_SIZE = 2;

const mainStyle = {
    margin: 20,
    paddingBottom: 10,
    paddingTop: 5
};

export default class CreateRoute extends Component {
    static checkRoute(route) {
        route.description = route.description.trim();
        route.name = route.name.trim();

        return route.name && route.description && route.pois.length >= TWO_SIZE;
    }

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            mapCoords: null
        };
    }

    componentDidMount() {
        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    createRoute(route) {
        if (this.componentIsMounted) {
            if (!this.checkRoute(route)) {
                return;
            }

            this.setState({ inProgress: true });

            firebase.auth().currentUser.getToken().then((token) => {
                return fetch(API_ROUTE_URL, {
                    body: JSON.stringify(route),
                    headers: { 'Authorization': `Bearer ${token}` },
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

CreateRoute.defaultProps = {
    center: {
        lat: 41.14792237,
        lng: -8.61129427
    },
    zoom: 17
};

CreateRoute.propTypes = { router: PropTypes.object };
