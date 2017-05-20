import React from 'react';
import PropTypes from 'prop-types';

import { blue500 as currentLocationColor } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';

import Pin from './Pin';

import 'styles/map.scss';

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export default function UserLocationComponent(props) {
    return <Pin lat={ props.lat } lng={ props.lng }>
        <div className="pin">
            <IconButton>
                <MapsMyLocation color={ currentLocationColor }/>
            </IconButton>
        </div>
    </Pin>;
};

UserLocationComponent.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};
