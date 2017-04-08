/**
 * Firebase authentication stub function
 * @returns {object} {{onAuthStateChanged: onAuthStateChanged}}
 */
function auth () {
    return {
        onAuthStateChanged: (callback) => {
            return typeof callback === 'function';
        }
    };
}

export { auth };
