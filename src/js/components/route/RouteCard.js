import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import RouteMap from './RouteMap';
import Rater from '../utils/MyRater';
import Tags from '../utils/MyTags';

import 'styles/route_card.scss';
import 'styles/utils.scss';

const API_ROUTE_RATING_URL = '/api/poi/rating';

export default class RouteCard extends Component {

    render() {
        let routeMap = null;
        let routeTagsPanel = null;
        let ratingPanel = null;

        if (this.props.poisList) {
            routeMap = <RouteMap poiList={this.props.poisList}/>;
        }

        if (this.props.routeInfo) {
            routeTagsPanel = <Tags readOnly tags={this.props.routeInfo.tags} />;
            ratingPanel = <Rater url={API_ROUTE_RATING_URL} poiId={this.props.routeInfo.routeId} user={this.props.user}/>;
        }

        return (
            <Card className="route-card">
                <CardMedia>
                    { routeMap }
                </CardMedia>
                <CardTitle title={this.props.routeInfo.name} />

                {routeTagsPanel}

                <CardText>
                    {this.props.routeInfo.description}
                </CardText>

                <div className="route-rating">
                    {ratingPanel}
                </div>
                { this.props.children }
            </Card>

        );
    }
}

RouteCard.propTypes = {
    children: PropTypes.any,
    poisList: PropTypes.array,
    routeInfo: PropTypes.shape({
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        routeId: PropTypes.number.isRequired,
        tags: PropTypes.object.isRequired
    }).isRequired,
    user: PropTypes.object
};
