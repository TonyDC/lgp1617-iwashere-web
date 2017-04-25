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
                    <p><i className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
                        {` ${this.props.errorMessage}`}
                    </p>

                    {this.props.children}
                </div>
            </div>
        );
    }
}

Error.propTypes = {
    children: PropTypes.any,
    errorMessage: PropTypes.string.isRequired
};
