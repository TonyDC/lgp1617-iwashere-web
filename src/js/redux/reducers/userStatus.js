import * as ActionTypes from '../actionTypes';

/**
 * User Action Reducer
 * @param {object} state the current state
 * @param {object} action the action
 * @returns {object} {*}
 */
export default function (state = {}, action) {
    switch (action.type) {
        case ActionTypes.LOG_IN_ACTION:
            return {
                ...state,
                isLogged: true,
                userInfo: action.payload
            };

        case ActionTypes.LOG_OUT_ACTION:
            return {
                ...state,
                isLogged: false,
                userInfo: null
            };

        default:
            return state;
    }
}
