import { combineReducers } from 'redux';

import userStatus from './userStatus';
import reserved from './reserved';

export default combineReducers({
    reserved,
    userStatus
});
