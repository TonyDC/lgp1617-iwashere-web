import * as ActionTypes from '../actionTypes';

const initialState = {
    contexts: [],
    selectedIndex: null
};

/**
 * Reserved Contexts Action Reducer
 * @param {object} state the current state
 * @param {object} action the action
 * @returns {object} {*}
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SELECTED_RESERVED_CONTEXT:
            return {
                ...state,
                selected: action.payload
            };

        case ActionTypes.NEW_RESERVED_CONTEXTS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
