import httpCodes from 'http-status-codes';
import firebase from 'firebase';

/**
 * Utility function to check the fetch response
 * @param {object} response the response from the server
 * @param bool checkContent if set, an error will be thrown if the response status is NO_CONTENT
 * @param bool parseContent if not set, the content will not be parsed
 * @returns {Promise<R>|Promise.<*>} a thenable Promise, if OK; a catchable Promise, if an error occurred (status code >= BAD_REQUEST)
 */
function checkFetchResponse(response, checkContent = false, parseContent = true) {
    const { status, statusText } = response;
    if (status >= httpCodes.BAD_REQUEST) {
        const error = new Error(statusText);
        error.status = status;

        return Promise.reject(error);
    }

    if (status === httpCodes.NO_CONTENT) {
        if (checkContent) {
            const error = new Error("No content");
            error.status = status;

            return Promise.reject(error);
        }

        return null;
    }

    if (parseContent) {
        return response.json();
    }

    return Promise.resolve(true);
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
