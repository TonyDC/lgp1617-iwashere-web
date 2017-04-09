import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import 'styles/login.scss';
import 'styles/utils.scss';

import logo from 'img/logo.png';

export default class POIDetail extends Component {

    constructor(props) {
        super(props);

        this.getPOI();
    }

    getPOI() {
        fetch('/api/poi', {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }).
        then((response) => {
            return response.json();
        }).
        then((response) => {
            console.log(response);
        });
    }

    render() {
        return (
            <div className="colorAccentSecondary">
                <Helmet>
                    <title>#iwashere - Sign in</title>
                </Helmet>

                <div className="container">
                    <div className="row main">
                        <div className="main-login main-center">
                            <div className="panel-heading">
                                <div className="panel-title text-center">
                                    <img src={logo} alt="#iwashere logo"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

POIDetail.propTypes = { history: PropTypes.object };

// To access Redux store
POIDetail.contextTypes = { store: PropTypes.object };
