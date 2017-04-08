import React, { Component } from 'react';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

export default class Alerts extends Component {

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
            Alert.info(`You are signed in as ${userStatus.userInfo.displayName}`, {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 5000
            });

        } else if (this.state.previousUserStatus && this.state.previousUserStatus.isLogged && !userStatus.isLogged) {
            Alert.closeAll();
            Alert.info('You are signed out.', {
                effect: 'slide',
                position: 'bottom-right',
                timeout: 5000
            });
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
Alerts.contextTypes = { store: React.PropTypes.object };
