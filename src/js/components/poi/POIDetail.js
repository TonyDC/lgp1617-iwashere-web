import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';

import Rater from '../utils/MyRater';
import Carousel from '../utils/MyCarousel';
import Timeline from '../utils/MyTimeline';
import Tags from '../utils/MyTags';

import 'styles/utils.scss';

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
            this.setState({ user: reduxState.userStatus.userInfo });
        });

        this.fetchPOIInfo();
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
    }

    fetchPOIInfo() {
        fetch(`/api/poi/${this.props.params.id}`, {
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

        let poiMediaSlider = null;
        let poiTagsPanel = null;
        let ratingPanel = null;
        let userMediaTimeline = null;
        if (this.props.params.id) {
            poiMediaSlider = <Carousel url={`/api/poi/media/${this.props.params.id}`} />;
            ratingPanel = <Rater url="/api/poi/rating" poiId={this.props.params.id} user={this.state.user}/>;
            userMediaTimeline = <Timeline url={`/api/poi/posts/${this.props.params.id}`} user={this.state.user}/>;

            if (this.state.poiInfo) {
                poiTagsPanel = <Tags readOnly tags={this.state.poiInfo.tags} />;
            }
        }

        return (
            <div className="colorAccentSecondary wrapper-fill">
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
                                    {poiTagsPanel}
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

POIDetail.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
