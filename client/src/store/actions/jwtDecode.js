import jwtDecode from "jwt-decode";
import {currentUser} from '../actions/viewAction'

export const decodeUser = () => {
    try {
       
        const user = localStorage.getItem('token')
        return jwtDecode(user)
    } catch (ex) {
        
    }
}