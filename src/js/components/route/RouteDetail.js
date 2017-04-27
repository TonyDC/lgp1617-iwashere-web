import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';

import RouteCard from './RouteCard';
import RouteMap from './RouteMap';
import Error from '../utils/Error';

import 'styles/utils.scss';

const DECIMAL_BASE = 10;

export default class RouteDetail extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = { user: reduxState.userStatus.userInfo };
    }

    componentDidMount() {
        this.componentIsMounted = true;

        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ user: reduxState.userStatus.userInfo });
        });

        this.fetchRouteInfo();
        this.fetchRoutePois();
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            if (response.status >= httpCodes.NO_CONTENT) {
                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((routeInfo) => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ routeInfo });
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
            if (response.status >= httpCodes.BAD_REQUEST) {
                return Promise.reject(new Error(response.statusText));
            }

            if (response.status >= httpCodes.NO_CONTENT) {
                if (!this.componentIsMounted) {
                    return Promise.reject(new Error(response.statusText));
                }

                this.setState({ routePois: [] });

                return Promise.reject(new Error(response.statusText));
            }

            return response.json();
        }).
        then((routePois) => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ routePois });
        });
    }

    poiSelected(poiId) {
        console.log(poiId);
        if (!this.componentIsMounted) {
            return;
        }

        this.setState({ selectedItem: poiId });
    }

    render() {
        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the route." />
            );
        }

        if (!this.state.routeInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let routeMap = null;
        if (this.state.routePois) {
            routeMap = <RouteMap onPoiSelected={this.poiSelected.bind(this)}
                                 poiList={this.state.routePois}
                                 router={this.props.router}

            />;
        }

        let routeCard = null;
        if (this.props.params.id) {
            if (this.state.routeInfo) {
                routeCard = <RouteCard routeInfo={this.state.routeInfo}
                                       routeMap={routeMap}
                                       user={this.state.user}
                />;
            }
        }

        let poiPreview = null;
        if (this.state.selectedItem) {
            poiPreview = <POISideBar poiId={this.state.selectedItem}
                                     onClose={() => {
                                         this.poiSelected(null);
                                     }}
                                     router={this.props.router}
            />;
        }

        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">
                        <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                            {poiPreview}
                            {routeCard}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

RouteDetail.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
RouteDetail.contextTypes = { store: PropTypes.object };
