import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import 'styles/timeline.scss';

const ZERO_INDEX = 0;
const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;

export default class POIMosaic extends Component {

    render() {
        const { poi } = this.props;

        if (!poi) {
            return (
                <GridTile key={this.props.key}>
                    <div className="hor-align vert-align">
                        <Loader color="#012935" className="loader"/>
                    </div>
                </GridTile>
            );
        }

        let poiMedia = null;
        if (poi.media.length) {
            poiMedia = <img src={poi.media[ZERO_INDEX].url}></img>;
        }

        return (
            <GridTile
                key={this.props.key}
                title={poi.name}
                subtitle={<span>{poi.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE} <StarBorder color="white" /></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>} // TODO add dismiss button
            >
                {poiMedia}
            </GridTile>
        );
    }
}

POIMosaic.propTypes = {
    key: PropTypes.string.isRequired,
    onDismiss: PropTypes.any,
    onSelect: PropTypes.any,
    poi: PropTypes.object
};
