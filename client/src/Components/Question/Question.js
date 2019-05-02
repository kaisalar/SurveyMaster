import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import ShortText from './ShortText/ShortText'
import MultipleChoise from './MultipleChoise/MultipleChoice'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/types'
import * as Qtypes from './QuestionTypes'

class Question extends Component {

    render() { 
      let AnswerType;
      switch (this.props.Q.type) { 
          case Qtypes.text:
          AnswerType = (<ShortText content={this.props.Q.content} />)
          break;
          case Qtypes.multipleChoise:
          AnswerType = (<MultipleChoise content={this.props.Q.content} changed={(id, event) => this.props.choiseChanged(id, event)}/>)
          break;
          default:
          AnswerType = (<ShortText content={this.props.Q.content}/>)
          break;
      } 
    return (
      <div className={styleClass.QuestionContainer}>
        <div className={styleClass.Question}>
          <MDBInput
            label="Untitled Question" value={this.props.Q.title} onChange={(e) => this.props.ChangeLabelHandler(e.target.value)} className={styleClass.BigText}
          />
          <select
            className={styleClass.SelectInput}
            value={this.props.Q.type}
            onChange={this.props.typeChanged}
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
    
  }
  
const mapStateToProps = (state,ownProps) => { 
  return { 
    Q: state.createSurvey.Questions[ownProps.index]
  }
}
const mapDispatchToProps = (dispatch,ownProps) => { 
  return { 
    ChangeLabelHandler: (newVal) => dispatch({type: actions.CHANGE_QUESTION_TITLE,index: ownProps.index,val:newVal })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
