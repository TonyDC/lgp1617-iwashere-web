import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import httpCodes from 'http-status-codes';
import Rater from 'react-rater';

import 'react-rater/lib/react-rater.css';
import 'styles/my_rater.scss';

const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;
const NO_RATING = 0;
const ONE_RATING = 1;
const DECIMAL_BASE = 10;

export default class MyRater extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.getRating();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    getRating() {
        let urlGet = this.props.url;

        if (this.props.poiId) {
            urlGet += `/${this.props.poiId}`;
        } else if (this.props.routeId) {
            urlGet += `/${this.props.routeId}`;
        }

        fetch(urlGet, {
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

            const ratingInfo = {};
            ratingInfo.rating = parseFloat(response.rating);
            ratingInfo.ratings = parseInt(response.ratings, DECIMAL_BASE);
            this.setState({ ratingInfo });
        });

    }

    getUserRating() {
        let urlGet = this.props.url;

        if (this.props.poiId) {
            urlGet += `/${this.props.poiId}/${this.props.user.uid}`;
        } else if (this.props.routeId) {
            urlGet += `/${this.props.routeId}/${this.props.user.uid}`;
        }

        fetch(urlGet, {
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

            const { ratingInfo } = this.state;
            ratingInfo.userRating = parseInt(response.rating, DECIMAL_BASE);
            this.setState({ ratingInfo });
        }).
        catch(() => {
            if (!this.componentIsMounted) {
                return;
            }

            const { ratingInfo } = this.state;
            ratingInfo.userRating = NO_RATING;
            this.setState({ ratingInfo });
        });
    }

    updateRating(ratingEvent) {
        if (ratingEvent.lastRating >= NO_RATING) {
            fetch(this.props.url, {
                body: JSON.stringify({
                    poiID: this.props.poiId,
                    rating: ratingEvent.rating,
                    routeID: this.props.routeId,
                    userID: this.props.user.uid
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).
            then((response) => {
                if (!response.ok) {
                    throw new Error();
                }
                this.getRating();
            }).
            catch(() => {
                if (!this.componentIsMounted) {
                    return;
                }

                const { ratingInfo } = this.state;
                ratingInfo.userRating = ratingEvent.lastRating;
                this.setState({ ratingInfo });
            });
        }
    }

    render() {
        if (!this.state.ratingInfo) {
            return (
                <div className="hor-align vert-align">
                    <Loader color="#012935" className="loader"/>
                </div>
            );
        }

        let userRating = null;
        if (this.props.user) {

            if (!(this.state.ratingInfo.userRating >= NO_RATING)) {
                this.getUserRating();
            } else {

                userRating =
                    <Col xs={12} md={12} lg={12}>
                        <Rater total={MAX_RATING_SCALE} rating={this.state.ratingInfo.userRating}
                               onRate={this.updateRating.bind(this)}/>
                        <span
                            className="rating-description"> {this.state.ratingInfo.userRating}/{MAX_RATING_SCALE}</span>
                        <span className="rating-description"><small>Your evaluation</small></span>
                    </Col>;
            }
        }

        return (
            <div className="ratings">
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <Rater interactive={false} total={MAX_RATING_SCALE} rating={this.state.ratingInfo.rating} />
                        <span className="rating-description"> {this.state.ratingInfo.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE}</span>
                        <span className="rating-description"><small>{this.state.ratingInfo.ratings} evaluation{ this.state.ratingInfo.ratings === ONE_RATING
                                                                                                                ? ''
                                                                                                                : 's'} </small></span>
                    </Col>
                    {userRating}
                </Row>
            </div>
        );
    }
}

MyRater.propTypes = {
    poiId: PropTypes.string,
    routeId: PropTypes.string,
    url: PropTypes.string.isRequired,
    user: PropTypes.any
};
