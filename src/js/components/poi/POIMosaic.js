import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import 'styles/timeline.scss';

const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;

export default class POIMosaic extends Component {

    render() {
        const { poi } = this.props;

        if (!poi) {
            return (
                <GridTile key={this.props.key}>

                </GridTile>
            );
        }
        /*<div className="hor-align vert-align">
            <Loader color="#012935" className="loader"/>
        </div>*/

        return (
            <GridTile
                key={this.props.key}
                title={poi.name}
                subtitle={<span>{poi.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE} <StarBorder color="white" /></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>} // TODO add dismiss button
            >
                <img src={poi.url}/>
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
