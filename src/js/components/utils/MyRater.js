import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import 'styles/my_rater.scss';

const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;
const NO_RATING = 0;

export default class MyRater extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.getRating();
    }

    getRating() {
        let urlGet = this.props.url;

        if (this.props.poiId) {
            urlGet += `/${this.props.poiId}`;
        }else if (this.props.routeId) {
            urlGet += `/${this.props.routeId}`;
        }

        if (this.props.userId) {
            urlGet += `/${this.props.userId}`;
        }

        fetch(urlGet, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((ratingInfo) => {
            this.setState({ ratingInfo });
        }).
        catch((error) => {
            console.error(error);
        });
    }

    updateRating(ratingEvent) {
        if (ratingEvent.lastRating >= NO_RATING) {
            fetch(this.props.url, {
                body: JSON.stringify({
                    poiID: this.props.poiId,
                    rating: ratingEvent.rating,
                    routeID: this.props.routeId,
                    userID: this.props.userId
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).
            then(() => {
                this.getRating();
            }).
            catch((error) => {
                console.error(error);

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
        if (this.props.userId) {
            userRating =
                <Col xs={12} md={12} lg={12}>
                    <Rater total={MAX_RATING_SCALE} rating={this.state.ratingInfo.userRating} onRate={this.updateRating.bind(this)}/>
                    <span className="rating-description"> Your rating</span>
                </Col>;
        }

        return (
            <div className="ratings">
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <Rater interactive={false} total={MAX_RATING_SCALE} rating={this.state.ratingInfo.rating} />
                        <span className="rating-description"> {this.state.ratingInfo.rating.toFixed(RATING_PRECISION)} stars</span>
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
    userId: PropTypes.string
};
