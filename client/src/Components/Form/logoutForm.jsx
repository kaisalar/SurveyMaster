import  { Component } from 'react';
import { Alert } from 'rsuite';
class Signout extends Component {
    componentDidMount() {
        localStorage.removeItem('token')
        Alert.success('Signed out successfully , see you later :D',2000)
        window.location = '/';
    }
    render() { 
        return ( null );
    }
}
 
export default Signout;