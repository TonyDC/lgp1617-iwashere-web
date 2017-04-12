/**
 * Created by ADC on 12/04/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/utils/NavBar';

import Alerts from '../components/utils/Alerts';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class MainRoutes extends Component {

    render() {
        return (
            <div className="fill-remaining-container">
                <NavBar router={this.props.router}/>
                <div className="fill-remaining">
                    { this.props.children }
                </div>
                <Alerts/>
            </div>
        );
    }
}

MainRoutes.propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};
