import React from 'react';
import { MDBBtn } from "mdbreact";
import styleClass from '../../Containers/SurveyBuilder/SurveyBuilder.module.css'
const CreateQuestion= props => {
    return(
        <div className={styleClass.CreateQuestion}>
            {/* <h3>Add new Question</h3> */}
            <MDBBtn className={styleClass.AddQuestionBtn}  gradient="blue" onClick={props.clicked}>ADD NEW QUESTION</MDBBtn>
        </div>
    );
}
export default CreateQuestion;