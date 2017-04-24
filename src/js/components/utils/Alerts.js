import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class Alerts extends Component {

    static createInfoAlert(message) {
        return Alert.info(message, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 5000
        });
    }

    static createErrorAlert(message) {
        return Alert.error(message, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });
    }

    static createWarningAlert(message) {
        return Alert.warning(message, {
            effect: 'slide',
            position: 'bottom-right',
            timeout: 'none'
        });
    }

    static closeAll() {
        return Alert.closeAll();
    }

    static close(alertID) {
        return Alert.close(alertID);
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.reduxListenerUnsubscribe = this.context.store.subscribe(() => {
            const reduxState = this.context.store.getState();

            this.alertUserLog(reduxState.userStatus);
        });
    }

    componentWillUnmount() {
        this.reduxListenerUnsubscribe();
    }

    alertUserLog(userStatus) {
        if (userStatus && userStatus.isLogged) {
            Alert.closeAll();
            Alerts.createInfoAlert(`You are signed in as ${userStatus.userInfo.displayName}.`);

        } else if (this.state.previousUserStatus && this.state.previousUserStatus.isLogged && !userStatus.isLogged) {
            Alert.closeAll();
            Alerts.createInfoAlert('You are signed out.');
        }

        this.setState({ previousUserStatus: userStatus });
    }

    render() {
        return (
            <Alert stack={{ limit: 30 }} />
        );
    }
}

// To access Redux store
Alerts.contextTypes = { store: PropTypes.object };
