import { combineReducers } from 'redux';

import userStatus from './userStatus';
import reserved from './reserved';
import action from './action';

export default combineReducers({
    action,
    reserved,
    userStatus
});
