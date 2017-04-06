import React, { Component } from 'react';

export default class Pin extends Component {

    render() {
        return (
            <div>
                <div>{this.props.text}</div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

Pin.propTypes = {
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
    text: React.PropTypes.string
};
