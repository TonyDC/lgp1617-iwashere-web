import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import Rater from '../utils/MyRater';
import Carousel from '../utils/MyCarousel';
import Tags from '../utils/MyTags';
import CreatePostDialog from './POICreatePost';

import 'styles/poi_card.scss';
import 'styles/utils.scss';

const API_POI_MEDIA_URL = '/api/poi/media/';
const API_POI_RATING_URL = '/api/poi/rating';
const API_POI_AUTH_RATING_URL = '/api/poi/auth/rating';

export default class POICard extends Component {

    render() {
        let poiMediaSlider = null;
        let poiTagsPanel = null;
        let ratingPanel = null;
        let poiPost = null;

        if (this.props.poiInfo) {
            poiMediaSlider = <Carousel url={`${API_POI_MEDIA_URL}${this.props.poiInfo.poiId}`} />;
            poiTagsPanel = <Tags readOnly tags={this.props.poiInfo.tags} />;
            ratingPanel = <Rater url={API_POI_RATING_URL}
                                 authUrl={API_POI_AUTH_RATING_URL}
                                 poiId={this.props.poiInfo.poiId}
                                 user={this.props.user}/>;

            if (this.props.showPostButton && this.props.user) {
                poiPost = <CreatePostDialog poiId={this.props.poiInfo.poiId}
                                            onNewPost={(newPost) => {
                                                if (typeof this.props.onNewPost !== 'undefined') {
                                                    this.props.onNewPost(newPost);
                                                }
                                            }}/>;
            }
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
                <div className="poi-post">
                    {poiPost}
                </div>
                { this.props.children }
            </Card>

        );
    }
}

POICard.defaultProps = { showPostButton: false };

POICard.propTypes = {
    children: PropTypes.any,
    onNewPost: PropTypes.func,
    poiInfo: PropTypes.shape({
        address: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        poiId: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired
    }).isRequired,
    showPostButton: PropTypes.bool,
    user: PropTypes.object
};
