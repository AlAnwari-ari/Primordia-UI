import {
    REGISTER_START,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
} from '../Actions/type'

const INITIAL_STATE = { 
    emailSuccess: '',
    loadingRegister: false,
    errorRegister: '',
    registerSuccess: false,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_START :
            return { ...state, loadingRegister: true}
        case REGISTER_FAILED :
            return { ...state, loadingRegister: false, errorRegister: action.payload}
        case REGISTER_SUCCESS :
            return { ...state, emailSuccess:action.payload.email, registerSuccess: true, loadingRegister: false }
        default :
            return state;
    }
};