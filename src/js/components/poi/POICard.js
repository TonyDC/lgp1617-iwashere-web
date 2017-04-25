import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import Rater from '../utils/MyRater';
import Carousel from '../utils/MyCarousel';
import Tags from '../utils/MyTags';

import 'styles/poi_card.scss';
import 'styles/utils.scss';

const API_POI_MEDIA_URL = '/api/poi/media/';
const API_POI_RATING_URL = '/api/poi/rating';

export default class POICard extends Component {

    render() {
        let poiMediaSlider = null;
        let poiTagsPanel = null;
        let ratingPanel = null;

        if (this.props.poiInfo) {
            poiMediaSlider = <Carousel url={`${API_POI_MEDIA_URL}${this.props.poiInfo.poiId}`} />;
            poiTagsPanel = <Tags readOnly tags={this.props.poiInfo.tags} />;
            ratingPanel = <Rater url={API_POI_RATING_URL} poiId={this.props.poiInfo.poiId} user={this.props.user}/>;
        }

        return (
            <Card className="poi-card">
                <CardMedia>
                    { poiMediaSlider }
                </CardMedia>
                <CardTitle title={this.props.poiInfo.name} subtitle={this.props.poiInfo.address} />

                {poiTagsPanel}

                <CardText>
                    {this.props.poiInfo.description}
                </CardText>

                <div className="poi-rating">
                    {ratingPanel}
                </div>

                {this.props.additionalElements}
            </Card>

        );
    }
}

POICard.propTypes = {
    additionalElements: PropTypes.any,
    poiInfo: PropTypes.object.isRequired,
    user: PropTypes.object
};
