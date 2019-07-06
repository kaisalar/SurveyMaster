import jwtDecode from "jwt-decode";

export const decodeUser = () => {
    try {
       
        const user = localStorage.getItem('token')
        return jwtDecode(user)
    } catch (ex) {
        
    }
}