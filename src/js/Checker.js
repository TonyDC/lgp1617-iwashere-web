import { FIREBASE_CONFIG } from '../../config';

import * as firebase from 'firebase';
const defaultApp = firebase.initializeApp(FIREBASE_CONFIG);

import { authenticatedFetch, checkFetchResponse } from './functions/fetch';

const NO_ELEMENTS = 0;
const ZERO_INDEX = 0;

/**
 * Firebase stores, in the local storage, information regarding the current logged in user.
 * Since Firebase has a delay as to confirm the identity of the user, it is required if a user is already logged in. Hence, the usage of the local storage.
 */
function checkFirebase() {
    return new Promise((resolve, reject) => {
        const { apiKey } = FIREBASE_CONFIG;
        const localStorageProperty = `firebase:authUser:${apiKey}:[DEFAULT]`;
        if (localStorage[localStorageProperty]) {
            // The user is already logged in -> wait for Firebase refresh
            const firebaseObserverUnsubscriber = defaultApp.auth().onAuthStateChanged((user) => {
                if (user) {
                    firebaseObserverUnsubscriber();

                    authenticatedFetch('/api/reserved/user-type', {}, { 'Accept': 'application/json' }, 'GET').
                    then(checkFetchResponse).
                    then((contexts) => {
                        let index = null;
                        if (Array.isArray(contexts) && contexts.length > NO_ELEMENTS) {
                            index = ZERO_INDEX;
                        }
                        resolve({
                            availableContexts: contexts,
                            selectedIndex: index
                        });
                    }).
                    catch((error) => {
                        reject(error);
                    });
                }
            });
        } else {
            // No user is logged in
            resolve(null);
        }
    });
}

/**
 * Ensures that a set of conditions are met before the application is rendered
 */
export default Promise.all([checkFirebase()]);
