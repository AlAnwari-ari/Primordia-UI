import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'

import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_START
    
    
} from './type'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch({ 
            type: LOGIN_START
        })
        if(user.email !== '' && user.password !== '') {
            axios.post(urlAPI + '/user/login', {
                email: user.email,
                password: user.password
            }).then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            }).catch(err => {
                console.log(err.response)
                dispatch({
                    type: LOGIN_FAILED,
                    payload: err.response.data.message
                })
            })
        } else {
            dispatch({
                type: LOGIN_FAILED,
                payload: 'Mohon isi Username dan Password'
            })
        }
    }
}