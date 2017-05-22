import * as ActionTypes from '../actionTypes';

/**
 * Signal the arrival of reserved contexts
 * @param {object} contents the contexts
 * @returns {object} {{payload: {contents: *}, type}}
 */
export function addReservedContents(contents) {
    return {
        payload: contents,
        type: ActionTypes.NEW_RESERVED_CONTEXTS
    };
}

/**
 * Logout Action Creator
 * @param {object} selectedContextIndex index of the selected context
 * @returns {object} {{type}}
 */
export function selectContext(selectedContextIndex) {
    return {
        payload: { selectedContextIndex },
        type: ActionTypes.SELECTED_RESERVED_CONTEXT
    };
}
