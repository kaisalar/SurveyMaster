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
      switch (this.props.Qs[this.props.index].type) { 
          case Qtypes.TEXT:
          AnswerType = (<ShortText index = {this.props.index} />)
          break;
          case Qtypes.MULTIPLE_CHOISE:
          AnswerType = (<MultipleChoise index = {this.props.index} contesnt={this.props.Qs[this.props.index].content.choices}/>)
          break;
          default:
          AnswerType = (<ShortText index={this.props.index}/>)
          break;
      } 
    return (
      <div className={styleClass.QuestionContainer}>
        <div className={styleClass.Question}>
          <MDBInput
            label="Untitled Question" value={this.props.Qs[this.props.index].title} onChange={(e) => this.props.ChangeLabelHandler(this.props.index, e.target.value)} className={styleClass.BigText}
          />
          <select
            className={styleClass.SelectInput}
            value={this.props.Qs[this.props.index].type}
            onChange={e => this.props.ChangeTypeHandler(this.props.index, e.target.value)}
          >
            <option value={Qtypes.TEXT}>
              short answer
            </option>
            <option value={Qtypes.MULTIPLE_CHOISE}>multiple choise</option>
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
    Qs: state.createSurvey.Questions
  }
}
const mapDispatchToProps = dispatch => { 
  return { 
    ChangeLabelHandler: (index, newVal) => dispatch({type: actions.CHANGE_QUESTION_TITLE,index: index,val:newVal }),
    ChangeTypeHandler: (index, newVal) => dispatch({type: actions.CHANGE_QUESTION_TYPE,index: index,val:newVal })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question);
