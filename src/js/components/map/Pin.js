import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pin extends Component {

    render() {
        return (
            <div onClick={this.props.onClick}>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

Pin.propTypes = {
    children: PropTypes.any,
    lat: PropTypes.number,
    lng: PropTypes.number,
    onClick: PropTypes.func,
    text: PropTypes.string
};
