import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Rater from 'react-rater';

import 'styles/poi-detail.scss';
import 'styles/utils.scss';

export default class POIDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            poi: {
                description: 'POI description',
                name: 'POI name',
                rating: 4,
                userRating: 3
            }
        };
        //this.getPOI();
    }

    getPOI() {
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

    render() {
        const MAX_RATING_SCALE = 5;

        let userRating = null;

        if (this.state.poi.userRating) {
            userRating =
               <Rater total={MAX_RATING_SCALE} rating={this.state.poi.userRating} onRate={this.updatePOIRating.bind(this)}/>;
        }

        return (
            <div className="colorAccentSecondary">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>

                <div className="container">
                    <Row className="show-grid">
                        <Col xs={12} mdOffset={2} md={8} lgOffset={2} lg={8}>

                            <div className="thumbnail">
                                { /* insert carousel here */ }
                                <div className="caption-full">
                                    <h4>{this.state.poi.name}</h4>
                                    <p>{this.state.poi.description}</p>
                                </div>
                                <div className="ratings">
                                    <Rater interactive={false} total={MAX_RATING_SCALE} rating={this.state.poi.rating} />
                                    {userRating}
                                </div>
                            </div>
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
