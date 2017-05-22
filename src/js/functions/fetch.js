import httpCodes from 'http-status-codes';
import firebase from 'firebase';

/**
 * Utility function to check the fetch response
 * @param {object} response the response from the server
 * @returns {Promise<R>|Promise.<*>} a thenable Promise, if OK; a catchable Promise, if an error occurred (status code >= BAD_REQUEST)
 */
function checkFetchResponse(response) {
    const { status, statusText } = response;
    if (status >= httpCodes.BAD_REQUEST) {
        const error = new Error(statusText);
        error.status = status;

        return Promise.reject(error);
    }

    return response.json();
}

/**
 * Perform an authenticated fetch
 * @param {object} url endpoint URL
 * @param {object} body the request body
 * @param {object} headers the request headers
 * @param {object} method the request method
 * @returns {Promise<R>|Promise.<*>} a thenable Promise, if OK; a catchable Promise, if an error occurred
 */
function authenticatedFetch(url, body, headers, method) {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        return Promise.reject(new Error('Current user not defined'));
    }

    return currentUser.getToken().then((token) => {
        return fetch(url, {
            body,
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },
            method
        });
    });
}

export { checkFetchResponse, authenticatedFetch };
