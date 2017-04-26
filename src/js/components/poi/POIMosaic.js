import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RemoveIcon from 'material-ui/svg-icons/av/shuffle';

import 'styles/poi_mosaic.scss';
import 'styles/utils.scss';

const ZERO_INDEX = 0;
const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;
const REMOVE_MESSAGE = 'Dismiss and replace';

export default class POIMosaic extends Component {

    render() {
        const { poi } = this.props;

        if (!poi) {
            return (
                <GridTile>
                    <div className="hor-align vert-align">
                        <Loader color="#012935" className="loader"/>
                    </div>
                </GridTile>
            );
        }

        let poiMedia = null;
        if (poi.media.length) {
            poiMedia = <img src={poi.media[ZERO_INDEX].url} />;
        }

        return (
            <GridTile
                className="clickable"
                onTouchTap={() => {
                    this.props.onSelect();
                }}
                title={poi.name}
                subtitle={<div className="vert-align"><span>{poi.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE}</span> <StarBorder color="white" className="rating-star" /></div>}
                actionIcon={<IconButton tooltipPosition="top-left"
                                        tooltip={REMOVE_MESSAGE}
                                        onTouchTap={() => {
                                            this.props.onDismiss();
                                        }}
                                        className="action-icon"
                            >
                                <RemoveIcon color="white" />
                            </IconButton>}
            >
                {poiMedia}
            </GridTile>
        );
    }
}

POIMosaic.propTypes = {
    onDismiss: PropTypes.any,
    onSelect: PropTypes.any,
    poi: PropTypes.object
};
