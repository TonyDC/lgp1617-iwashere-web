import React, { Component } from 'react';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class Alerts extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <Alert stack={{ limit: 30 }} />
        );
    }
}
