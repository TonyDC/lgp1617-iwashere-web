import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import { GridLoader as Loader } from 'halogen';
import firebase from 'firebase';

import 'styles/utils.scss';

export default class Checker extends Component {

    constructor(props) {
        super(props);
        this.state = { allChecked: false };
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.checkConditions();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    /*
     * Note:
     *  Firebase stores, in the local storage, information regarding the current logged in user.
     *  Since Firebase has a delay as to confirm the identity of the user, it is required if a user is already logged in. Hence, the usage of the local storage.
     */
    checkFirebase() {
        return new Promise((resolve) => {
            const localStorageProperty = `firebase:authUser:${firebase.app().options.apiKey}:[DEFAULT]`;
            if (localStorage[localStorageProperty]) {
                // The user is already logged in -> wait for Firebase refresh
                this.firebaseObserverUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.firebaseObserverUnsubscriber();
                        resolve();
                    }
                });
            } else {
                // No user is logged in
                resolve();
            }
        });
    }

    checkConditions() {
        nProgress.start();

        Promise.all([this.checkFirebase()]).
        then(() => {
            this.setState({ allChecked: true });
        }).
        catch(() => {
            this.setState({ allChecked: true });
        }).
        then(() => {
            nProgress.done();
        });
    }

    render() {
        const { allChecked } = this.state;
        if (allChecked) {
            // Only one child is permitted, otherwise, React considers it as an error
            return this.props.children;
        }

        return (
            <div className="hor-align vert-align">
                <Loader size="40px" color="#FF6633"/>
            </div>
        );
    }
}

Checker.propTypes = { children: PropTypes.any };
