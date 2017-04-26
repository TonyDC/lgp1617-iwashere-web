import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';

import RouteCard from './RouteCard';
import Error from '../utils/Error';

import 'styles/utils.scss';

const DECIMAL_BASE = 10;

export default class RouteDetail extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = {
            loadingRouteInfo: true,
            user: reduxState.userStatus.userInfo
        };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ user: reduxState.userStatus.userInfo });
        });

        this.fetchRouteInfo();

        this.componentIsMounted = true;
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

            return response.json();
        }).
        then((response) => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({
                loadingRouteInfo: false,
                routeInfo: response
            });
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });
        });
    }

    render() {
        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the route." />
            );
        }

        if (this.state.loadingRouteInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let routeCard = null;
        if (this.props.params.id) {

            if (this.state.routeInfo) {
                routeCard = <RouteCard poiInfo={this.state.routeInfo} user={this.state.user} />;
            }
        }

        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">

                        <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
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
