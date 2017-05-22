import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nProgress from 'nprogress';
import { GridLoader as Loader } from 'halogen';
import firebase from 'firebase';

import { authenticatedFetch, checkFetchResponse } from './functions/fetch';
import { addReservedContexts } from './redux/action creators/reserved';

import 'styles/utils.scss';

const NO_ELEMENTS = 0;
const ZERO_INDEX = 0;

/**
 * Ensures that a set of conditions are met before the application is rendered
 */
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
        return new Promise((resolve, reject) => {
            const localStorageProperty = `firebase:authUser:${firebase.app().options.apiKey}:[DEFAULT]`;
            if (localStorage[localStorageProperty]) {
                // The user is already logged in -> wait for Firebase refresh
                this.firebaseObserverUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.firebaseObserverUnsubscriber();
                        // TODO to think: innefficiency?

                        // TODO only perform when accessing reserved area only
                        authenticatedFetch('/api/reserved/user-type', {}, { 'Accept': 'application/json' }, 'GET').
                        then(checkFetchResponse).
                        then((contexts) => {
                            let index = null;
                            if (contexts && Array.isArray(contexts) && contexts.length > NO_ELEMENTS) {
                                index = ZERO_INDEX;
                            }
                            this.context.store.dispatch(addReservedContexts(contexts, index));
                            resolve();
                        }).
                        catch((error) => {
                            console.error(error);
                            reject(error);
                        });
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

Checker.contextTypes = {
    muiTheme: PropTypes.object,
    store: PropTypes.object
};
