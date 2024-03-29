import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';

import POICard from './POICard';
import Error from '../utils/Error';
import POIPosts from './POIPosts';

import 'styles/utils.scss';

const DECIMAL_BASE = 10;

export default class POIDetail extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = {
            loadingPOIInfo: true,
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

        this.fetchPOIInfo();

        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
        this.componentIsMounted = false;
    }

    fetchPOIInfo() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });

            return;
        }

        fetch(`/api/poi/${this.props.params.id}`, {
            headers: { 'Accept': 'application/json' },
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
                loadingPOIInfo: false,
                poiInfo: response
            });
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });
        });
    }

    onNewPost(newPost) {
        if (this.componentIsMounted) {
            this.setState({ newPost });
        }
    }

    render() {
        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the point of interest." />
            );
        }

        if (this.state.loadingPoiInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let poiCard = null;
        let userMediaTimeline = null;
        if (this.props.params.id) {

            if (this.state.poiInfo) {
                poiCard = <POICard poiInfo={this.state.poiInfo} user={this.state.user} showPostButton onNewPost={this.onNewPost.bind(this)}/>;
                userMediaTimeline = <POIPosts url={`/api/post`} poiId={this.props.params.id} user={this.state.user} newPost={this.state.newPost}/>;
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
                            {poiCard}
                        </Col>

                        {userMediaTimeline}
                    </Row>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
