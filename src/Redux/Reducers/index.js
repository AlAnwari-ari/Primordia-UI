import { combineReducers } from 'redux'
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    register: RegisterReducer,
    login: LoginReducer,
    user: UserReducer
})