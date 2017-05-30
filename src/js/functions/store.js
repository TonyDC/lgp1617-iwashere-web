const NO_ELEMENTS = 0;

/**
 * Returns the user's contextId.
 * @param store
 * @return {*|null} the contextId of the user
 */
function getContext(store) {
    if (!store) {
        throw new Error('Bad store object');
    }

    const { reserved: reservedPropStore } = store.getState();
    const { contexts, selectedIndex: selectedContextIndex } = reservedPropStore;
    if (!contexts || !Array.isArray(contexts) || contexts.length === NO_ELEMENTS) {
        throw new Error('No contexts available.');
    } else if (typeof selectedContextIndex !== 'number' || contexts.length <= selectedContextIndex) {
        throw new Error('Bad user context selected.');
    }

    return contexts[selectedContextIndex].contextId;
}

export { getContext };
