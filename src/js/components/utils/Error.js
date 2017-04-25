import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import 'styles/utils.scss';

export default class Error extends Component {

    render() {
        return (
            <div className="hor-align vert-align">
                <div className="alert alert-danger error">
                    <i className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
                    {` ${this.props.errorMessage}`}
                </div>
                {this.props.children}
            </div>
        );
    }
}

Error.propTypes = {
    children: PropTypes.object,
    errorMessage: PropTypes.string.isRequired
};
