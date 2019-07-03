import axios from 'axios';
const instance = axios.create({
    baseURL: "https://survey-master-v1.herokuapp.com/"
})
//https://survey-master-v1.herokuapp.com/
export default instance;