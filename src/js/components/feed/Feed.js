import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';

import POICard from './POICard';
import Error from '../utils/Error';
import Timeline from '../utils/MyTimeline';

import 'styles/poi_card.scss';
import 'styles/utils.scss';

const DECIMAL_BASE = 10;

export default class Feed extends Component {

    constructor(props, context) {
        super(props);

        const reduxState = context.store.getState();
        this.state = {
            user: reduxState.userStatus.userInfo
        };
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

        this.fetchPosts();
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
        this.componentIsMounted = false;
    }

    fetchPosts() {
        if (isNaN(parseInt(this.props.params.id, DECIMAL_BASE))) {
            if (!this.componentIsMounted) {
                return;
            }

            this.setState({ error: true });

            return;
        }

        fetch(`/api/poi/${this.props.params.id}`, {
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

    render() {
        if (this.state.error) {
            return (
                <Error errorMessage="Error while retrieving information about the point of interest." />
            );
        }

        if (this.state.loadingPOIInfo) {
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
                poiCard = <POICard poiInfo={this.state.poiInfo} user={this.state.user} />;

                if (this.state.poiInfo.type === PLACE_TYPE) {
                    userMediaTimeline =
                        <Timeline url={`/api/post`} poiId={this.props.params.id} user={this.state.user}/>;
                }
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

Feed.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
Feed.contextTypes = { store: PropTypes.object };
