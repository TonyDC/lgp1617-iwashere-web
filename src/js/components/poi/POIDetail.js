import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { GridLoader as Loader } from 'halogen';
import Moment from 'moment';

import MyRater from '../utils/MyRater';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import 'styles/timeline.scss';
import 'styles/utils.scss';

const TRANSITION_INTERVAL = 10000;
const LIMIT = 6;

export default class POIDetail extends Component {

    constructor(props) {
        super(props);

        // For testing purposes only
        this.state = {
            loadingPOIInfo: true,
            userMediaOffset: 0
        };
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

    getPOIMedia(poiMedia) {
        const mediaList = [];
        let key = 0;
        poiMedia.forEach((mediaEntry) => {
            if (mediaEntry.type === 'IMG') {
                mediaList.push(<div key={key++}>
                    <img src={mediaEntry.url} />
                </div>);
            } else if (mediaEntry.type === 'VID') {
                mediaList.push(<div key={key++}>
                    <iframe src={mediaEntry.url} />
                </div>);
            }
        });

        return mediaList;
    }

    getUserMedia(userMedia) {
        const mediaList = [];

        let itemClassInverted = false;
        let previousTimeStamp = null;
        let key = 0;
        userMedia.forEach((mediaEntry) => {
            const date = new Date(mediaEntry.time);

            if (date.getMonth() !== previousTimeStamp) {
                previousTimeStamp = date.getMonth();
                mediaList.push(<li key={key++}><div className="tldate">{ Moment(date).format("MMM") } { date.getFullYear()} </div></li>);
            }

            mediaList.push(
            <li className={`timeline${itemClassInverted
                                        ? '-inverted'
                                        : ''}`} key={key++}>
                <div className="tl-circ"></div>
                <div className="timeline-panel">
                    <div className="tl-heading">
                        <p><small className="text-muted"><i className="glyphicon glyphicon-time"/> { mediaEntry.time }</small></p>
                    </div>
                    <div className="tl-body">
                        <p><img src={ mediaEntry.url }/></p>
                    </div>
                </div>
            </li>
            );

            itemClassInverted = !itemClassInverted;
        });

        return mediaList;
    }

    fetchUserMedia() {
        fetch(`/api/poi/media/${this.state.poiInfo.id}`, {
            body: {
                limit: LIMIT,
                offset: this.state.userMediaOffset,
            },
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            console.log(response);

            const userMedia = this.state.userMedia.concat(this.getUserMedia(response));

            const userMediaOffset = this.state.userMediaOffset + LIMIT;

            this.setState({
                userMedia,
                userMediaOffset
            });
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

        let rating = null;
        if (this.props.params.id) {
            rating = <MyRater url="/api/poi/rating" poiId={this.props.params.id} userId={'1'} />; //this.state.user.id
        }

        let poiMedia = null;
        let poiSlider = null;
        if (this.state.poiMedia) {
            poiMedia = this.getPOIMedia(this.state.poiMedia);

            poiSlider =
                <Carousel useKeyboardArrows={true} autoPlay={true} infiniteLoop={true}
                          showArrows={true} showThumbs={ false } showStatus={ false }
                          interval={TRANSITION_INTERVAL}>
                    {poiMedia}
                </Carousel>;
        }

        let userMedia = null;
        let poiTimeline = null;
        if (this.state.userMedia) {
            userMedia = this.getUserMedia(this.state.userMedia);
            poiTimeline =
                <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                    <ul className="timeline">
                        {userMedia}
                    </ul>
                </Col>;
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
                                {poiSlider}

                                <div className="caption-full">
                                    <h4>{this.state.poiInfo.name}</h4>
                                    <p>{this.state.poiInfo.description}</p>
                                </div>
                                {rating}
                            </div>
                        </Col>

                        {poiTimeline}
                    </Row>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = { history: PropTypes.object };

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
