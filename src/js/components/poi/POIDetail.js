import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Moment from 'moment';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import 'styles/poi-detail.scss';
import 'styles/timeline.scss';
import 'styles/utils.scss';

const MAX_RATING_SCALE = 5;
const TRANSITION_INTERVAL = 10000;
const LIMIT = 6;

export default class POIDetail extends Component {

    constructor(props) {
        super(props);

        // For testing purposes only
        this.state = {
            poi: {
                description: 'POI description',
                name: 'POI name',
                rating: 4,
                userRating: 3,
                media: [{url: 'http://placehold.it/800x300', type: 'IMG'}, {url: 'http://placehold.it/800x300', type: 'IMG'}, {url: 'https://www.youtube.com/embed/n0F6hSpxaFc', type: 'VID'}]
            },
            userMedia: [{time: 'March 21, 2012', url: 'http://lorempixel.com/600/300/nightlife'}, {time: 'March 21, 2012', url: 'http://lorempixel.com/600/300/nightlife'}, {time: 'April 23, 2012', url: 'http://lorempixel.com/600/300/nightlife'}],
            userMediaOffset: 0
        };
        //this.fetchPOIInformation();
    }

    fetchPOIInformation() {
        fetch(`/api/poi/${this.state.poi.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            console.log(response);
            this.setState({ poi: response });
        });
    }

    updatePOIRating(ratingEvent) {
        if (ratingEvent.lastRating) {
            // TODO create or update user rating
        }
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
        fetch(`/api/poi/media/${this.state.poi.id}`, {
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
        let userRating = null;
        if (this.state.poi.userRating) {
            userRating =
               <Rater total={MAX_RATING_SCALE} rating={this.state.poi.userRating} onRate={this.updatePOIRating.bind(this)}/>;
        }

        let poiMedia = null;
        if (this.state.poi) {
            poiMedia = this.getPOIMedia(this.state.poi.media);
        }

        let userMedia = null;
        if (this.state.userMedia) {
            userMedia = this.getUserMedia(this.state.userMedia);
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
                                <Carousel useKeyboardArrows={true} autoPlay={true} infiniteLoop={true}
                                          showArrows={true} showThumbs={ false } showStatus={ false }
                                          interval={TRANSITION_INTERVAL}>
                                        {poiMedia}
                                </Carousel>

                                <div className="caption-full">
                                    <h4>{this.state.poi.name}</h4>
                                    <p>{this.state.poi.description}</p>
                                </div>
                                <div className="ratings">
                                    <Row className="show-grid">
                                        <Col xs={12} md={12} lg={12}>
                                            <Rater interactive={false} total={MAX_RATING_SCALE} rating={this.state.poi.rating} />
                                            <span className="rating-description"> {this.state.poi.rating.toFixed(1)} stars</span>
                                        </Col>
                                        <Col xs={12} md={12} lg={12}>
                                            {userRating}
                                            <span className="rating-description"> Your rating</span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>
                            <ul className="timeline">
                                {userMedia}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = { history: PropTypes.object };

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
