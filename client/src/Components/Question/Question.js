import React from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import ShortText from './ShortText/ShortText'
import MultipleChoise from './MultipleChoise/MultipleChoice'

const Question = props => {

      let AnswerType;
      switch (props.type) { 
          case "Text":
          AnswerType = (<ShortText content={props.content} />)
          break;
          case "Multiple Choice":
          AnswerType = (<MultipleChoise content={props.content} changed={(id, event) => props.choiseChanged(id, event)}/>)
          break;
          default:
          AnswerType = (<ShortText content={props.content}/>)
          break;
      } 
    return (
      <div className={styleClass.QuestionContainer}>
        <div className={styleClass.Question}>
          <MDBInput
            label="Untitled Question" value={props.label} onChange={props.labelChanged} className={styleClass.BigText}
          />
          <select
            className={styleClass.SelectInput}
            value={props.type}
            onChange={props.typeChanged}
          >
            <option value="text">
              short answer
            </option>
            <option value="Multiple Choice">multiple choise</option>
          </select>
        </div>
        <div className={styleClass.Answer}>
        {AnswerType}
        </div>
        
      </div>
    );
  }

export default Question;
