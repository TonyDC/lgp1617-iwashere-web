import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import firebase from 'firebase';
import { checkFetchResponse, authenticatedFetch } from '../../../../functions/fetch';
import { getContext } from '../../../../functions/store';
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

    constructor(props) {
        super(props);

        this.state = { inProgress: false };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        Alerts.closeAll();
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
        const { currentUser } = firebase.auth();
        if (currentUser && this.componentIsMounted && this.checkRoute(route)) {
            nProgress.start();
            this.setState({ inProgress: true });

            route.contextId = route.contextId ? route.contextId : getContext(this.context.store);

            const headers = {
                'Content-Type': 'application/json',
                'X-user-context': getContext(this.context.store)
            };

            authenticatedFetch(API_ROUTE_URL, JSON.stringify(route), headers, 'POST').
            then(checkFetchResponse).
            then((newRoute) => {
                nProgress.done();
                Alerts.createInfoAlert('Route created.');
                this.props.router.push(`/reserved/dash/route/${newRoute.routeId}`);
            }).
            catch(() => {
                nProgress.done();
                if (this.componentIsMounted) {
                    this.setState({ inProgress: false });
                    this.errorAlert = Alerts.createErrorAlert('Error while creating the new route.');
                }
            });
        }
    }

    render() {
        const defaultRoute = {
            description: '',
            metaInfo: '',
            name: '',
            pois: [],
            routeId: null,
            tags: []
        };

        return (
            <div className="wrapper-fill vert-align hor-align">
                <Paper className="paper-min-width" zDepth={2} style={mainStyle}>
                    <Helmet>
                        <title>#iwashere - Reserved - Route</title>
                    </Helmet>
                    <RouteForm inProgress={this.state.inProgress}
                               userContext={getContext(this.context.store)}
                               onSave={this.createRoute.bind(this)}
                               router={this.props.router}
                               route={defaultRoute}
                               title="Create a route" />
                </Paper>
            </div>
        );
    }
}

CreateRoute.contextTypes = { store: PropTypes.object };

CreateRoute.propTypes = { router: PropTypes.object };
