import {
    LOGIN_SUCCESS,
    LOGIN_START,
    LOGIN_FAILED
} from '../Actions/type'

const INITIAL_STATE = { 
    data: null,
    errorLogin: '',
    loadingLogin: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START :
            return { ...state, loadingLogin: true, errorLogin: '' }
        case LOGIN_SUCCESS :
            return INITIAL_STATE
        case LOGIN_FAILED :
            return { ...state, errorLogin:action.payload, loadingLogin: false }
        default :
            return state;
    }
};