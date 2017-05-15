/* eslint no-underscore-dangle: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridLoader as Loader } from 'halogen';
import Image from '../../../utils/Image';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

import 'styles/poi_mosaic.scss';
import 'styles/utils.scss';

const MEDIA_TYPE = "image;imagem";
const MAX_RATING_SCALE = 5;
const RATING_PRECISION = 1;
const POI_BUTTON_MESSAGE = 'Go to the point of interest';

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
        if (poi.media) {
            poi.media.some((mediaItem) => {
                if (mediaItem.type === MEDIA_TYPE) {
                    poiMedia = <Image url={mediaItem.urlS}/>;
                }

                return poiMedia !== null;
            });
        }

        let poiButton = null;
        if (this.props.dismissible) {
            poiButton =
                <IconButton tooltipPosition="top-left" tooltip={POI_BUTTON_MESSAGE}>
                    <CommunicationLocationOn color="white" />
                </IconButton>;
        }

        return (
            <GridTile
                key={poi.poiId}
                className="clickable"
                onTouchTap={(event) => {
                    if (event._targetInst._tag === 'svg' || event._targetInst._tag === 'path') {
                        this.props.onDismiss(poi.poiId);
                    } else {
                        this.props.onSelect(poi.poiId);
                    }
                }}
                title={poi.name}
                subtitle={<div className="vert-align"><span>{poi.rating.toFixed(RATING_PRECISION)}/{MAX_RATING_SCALE}</span> <StarBorder color="white" className="rating-star" /></div>}
                actionIcon={poiButton}
            >
                {poiMedia}
            </GridTile>
        );
    }
}

POIMosaic.defaultProps = { dismissible: true };

POIMosaic.propTypes = {
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    onSelect: PropTypes.func,
    poi: PropTypes.object.isRequired
};
