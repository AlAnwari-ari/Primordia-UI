import { LOGIN_SUCCESS, LOGOUT_USER } from '../Actions/type';

const INITIAL_STATE = {
    id : 0,
    nama: '',
    email: '',
    tanggalLahir: '',
    kelamin: '',
    bergabung: '',
    pathUser: '',
    status: '',
    token: '',
    authchecked: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...action.payload, authchecked: true }
        case LOGOUT_USER:
            return {...INITIAL_STATE, authchecked: true }    
        default:
            return state
    }
}