import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';

import Pin from './Pin';

import 'styles/map.scss';

const POI_COLOR = '#E5402A';

/**
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function SelectedLocation(props) {
    return <Pin lat={ props.lat } lng={ props.lng } onClick={ props.onClick }>
        <div className="pin">
            <IconButton>
                <CommunicationLocationOn color={ POI_COLOR }/>
            </IconButton>
        </div>
    </Pin>;
}

SelectedLocation.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    onClick: PropTypes.func
};
