import * as ActionTypes from '../actionTypes';

/**
 * Signal the arrival of reserved contexts
 * @param {object} contexts the contexts
 * @param {object} selectedIndex the selected index
 * @returns {object} {{payload: {contents: *}, type}}
 */
export function addReservedContexts(contexts, selectedIndex) {
    return {
        payload: {
            contexts,
            selectedIndex
        },
        type: ActionTypes.NEW_RESERVED_CONTEXTS
    };
}

/**
 * Logout Action Creator
 * @param {object} selectedIndex index of the selected context
 * @returns {object} {{type}}
 */
export function selectContext(selectedIndex) {
    return {
        payload: { selectedIndex },
        type: ActionTypes.SELECTED_RESERVED_CONTEXT
    };
}
