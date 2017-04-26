import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';

import 'styles/timeline.scss';

const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;

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

        return (
            <GridTile
                key={poi.poiId}
                title={poi.name}
                subtitle={<span>{poi.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE} <StarBorder color="white" /></span>}
                actionIcon={<IconButton></IconButton>} // TODO add dismiss button
            >
                <img src={poi.url}/>
            </GridTile>
        );
    }
}

POIMosaic.propTypes = {
    onDismiss: PropTypes.any,
    onSelect: PropTypes.any,
    poi: PropTypes.object
};
