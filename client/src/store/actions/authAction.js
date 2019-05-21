import * as actionTypes from './types';
import axios from '../../axios-requests';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START,

    }
}

export const authSuccess = (authData) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    }
}

export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authSignUp = (firstName , lastName ,email , password) =>async dispatch => {
    try {
        const headers ={
             'Content-Type': 'application/json',
                'x-auth-token': 'asdasdd' 
        }
        dispatch(authStart())
        const authData = {
        firstName : firstName,
        lastName : lastName,
          email: email,
          password: password,
        };
        const response = await axios.post('/api/users',authData)
        console.log(response)
        return dispatch(authSuccess(response.data))
    }
    catch(err){

    }
}
