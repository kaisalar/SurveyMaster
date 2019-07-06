import * as actionTypes from './types';
import axios from '../../axios-requests';
import { Alert } from 'rsuite';

export const previewReport = (id, dataLoaded) => dispatch => {
    let connectionRoute = "/api/surveys/" + id + '/report';
    axios.get(connectionRoute)
        .then(response => {
            console.log(response.data);
            dispatch({
                type: actionTypes.PREVIEW_REPORT,
                payload: response.data
            });
            dataLoaded(true);
        })
        .catch(err => {
            console.log(err);
            Alert.error("bad connection can't load the report now...");
        })
}
