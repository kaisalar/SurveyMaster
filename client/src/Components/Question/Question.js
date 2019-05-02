import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import ShortText from './ShortText/ShortText'
import MultipleChoise from './MultipleChoise/MultipleChoice'
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
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
            label="Untitled Question" value={this.props.Q.label} onChange={this.props.labelChanged} className={styleClass.BigText}
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
  
const mapStateToProps = state => { 
  return { 
    Q: state.Questions[this.props.index]
  }
}
const mapDispatchToProps = dispatch => { 
  return { 
    ChangeLabelHandler: () => dispatch({type: actions.CHANGE_QUESTION_LABEL,index: this.props.index})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
