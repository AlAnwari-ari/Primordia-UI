import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'

import {
    LOGIN_SUCCESS,
    LOGOUT_USER
    
    
} from './type'

export const checkLogin = (token) => {
    return (dispatch) => {
        var options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(urlAPI + '/user/keeplogin', null, options) 
        .then(res => {
            console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            localStorage.removeItem('token')
            console.log(err.response.data);
            dispatch({
                type: LOGOUT_USER
            })
        })
    }

}

export const logoutUser = () => {
    localStorage.removeItem('token')
    return {
        type: LOGOUT_USER
    }
}