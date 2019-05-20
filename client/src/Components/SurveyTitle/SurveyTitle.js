import React from 'react';
import { MDBInput } from "mdbreact";
import styleClass from '../../Containers/SurveyBuilder/SurveyBuilder.module.css'
import './SurveyTitle.css'
const SurveyTitle= props => {
    return(
        <div className={styleClass.SurveyTitle + " survey-title"}>
            {/* <h3>Add new Question</h3> */}
            <MDBInput value={props.value} onChange={props.changed}></MDBInput>
        </div>
    );
}
export default SurveyTitle;