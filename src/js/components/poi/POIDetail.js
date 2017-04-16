import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';

import Rater from '../utils/MyRater';
import Carousel from '../utils/MyCarousel';
import Timeline from '../utils/MyTimeline';

import 'styles/utils.scss';

export default class POIDetail extends Component {

    constructor(props) {
        super(props);

        this.state = { loadingPOIInfo: true };
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();
            this.setState({ user: reduxState.userStatus });
        });

        this.fetchPOIInfo();
    }

    fetchPOIInfo() {
        fetch(`/api/poi/info/${this.props.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            this.setState({
                loadingPOIInfo: false,
                poiInfo: response
            });
        }).
        catch(() => {
            this.props.router.push('/');
        });
    }

    render() {
        if (this.state.loadingPOIInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let ratingPanel = null;
        let poiMediaSlider = null;
        let userMediaTimeline = null;
        if (this.props.params.id) {
            ratingPanel = <Rater url="/api/poi/rating" entityId={this.props.params.id} userId={this.state.user.id} />;
            poiMediaSlider = <Carousel url={`/api/poi/media/${this.props.params.id}`} />;
            userMediaTimeline = <Timeline url={`/api/poi/posts/${this.props.params.id}`} userId={this.state.user.id} />;
        }

        return (
            <div className="colorAccentSecondary">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">

                        <Col xs={12} mdOffset={1} md={10} lgOffset={1} lg={10}>
                            <div className="thumbnail">
                                {poiMediaSlider}

                                <div className="caption-full">
                                    <h4>{this.state.poiInfo.name}</h4>
                                    <h5>{this.state.poiInfo.address}</h5>
                                    <p>{this.state.poiInfo.description}</p>
                                </div>
                                {ratingPanel}
                            </div>
                        </Col>

                        {userMediaTimeline}
                    </Row>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = { history: PropTypes.object };

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
