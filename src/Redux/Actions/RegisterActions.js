import axios from 'axios'

import {
    REGISTER_SUCCESS,
    REGISTER_START,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_USER
    
    
} from './type'

import { urlAPI } from '../../helper/urlAPI'

export const registerUser = (formdata, options) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_START
        })
        axios.post(urlAPI + '/user/register', formdata, options)
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        email: res.data.results.email,
                        token: res.data.results.token,
                    }
                })
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: REGISTER_FAILED,
                    payload: err.response.data
                })
            })

        
    }
}

export const confirmEmail = (token) => {
    return (dispatch) => {
        var options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post(urlAPI + '/user/confirmemail', null, options)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token)
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