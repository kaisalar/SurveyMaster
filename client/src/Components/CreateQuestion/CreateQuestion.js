import React from 'react';
import { MDBBtn } from "mdbreact";
import styleClass from './CreateQuestion.module.css'
const CreateQuestion= props => {
    return(
        <div className={styleClass.CreateQuestion}>
            <h3>Add new Question</h3>
            <MDBBtn className={styleClass.AddQuestionBtn}  gradient="blue" onClick={props.clicked}>Add</MDBBtn>
        </div>
    );
}
export default CreateQuestion;