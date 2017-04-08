import * as ActionTypes from '../actionTypes';

/**
 * Login Action Creator
 * @param {object} user the user information
 * @returns {object} {{payload: {user: *}, type}}
 */
export function loginActionCreator(user) {
    return {
        payload: { user },
        type: ActionTypes.LOG_IN_ACTION
    };
}

/**
 * Logout Action Creator
 * @returns {object} {{type}}
 */
export function logoutActionCreator() {
    return { type: ActionTypes.LOG_OUT_ACTION };
}
