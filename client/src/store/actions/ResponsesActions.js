import axios from '../../axios-requests';
import * as actionTypes from './types';


export const previewResponses = (id,dataLoaded) => dispatch => {
    axios.get("/api/surveys/" + id + "/responses")
    .then(response => {
        dispatch({
            type: actionTypes.LOAD_RESPONSES_LIST,
            payload: response.data
        });
      dataLoaded(true);
    })
}

export const getFullResponse = (Sid,Rid) => dispatch => { 
    console.log(Sid,Rid)
    axios.get("/api/surveys/" + Sid + "/responses/" + Rid)
    .then(response => console.log(response))
}