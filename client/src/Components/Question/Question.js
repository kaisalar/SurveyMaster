import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import ShortText from "./ShortText/ShortText";
import MultipleChoice from "./MultipleChoise/MultipleChoice";
import { connect } from "react-redux";
import * as actions from "../../store/actions/types";
import * as Qtypes from "./QuestionTypes";

class Question extends Component {
  render() {
    let AnswerType;
    const index = this.props.index;
    const Q = this.props.Qs[index];
    switch (Q.type) {
      case Qtypes.TEXT:
        AnswerType = <ShortText index={index} />;
        break;
      case Qtypes.MULTIPLE_CHOISE:
        AnswerType = (
          <MultipleChoice index={index} contesnt={Q.content.choices} />
        );
        break;
      default:
        AnswerType = <ShortText index={index} />;
        break;
    }
    return (
      <div className={styleClass.QuestionContainer}>
        <div className={styleClass.Question}>
          <MDBInput
            label="Enter Your Question Title"
            value={Q.title}
            onChange={e => this.props.ChangeLabelHandler(index, e.target.value)}
            className={styleClass.BigText}
          />
          <select
            className={styleClass.SelectInput}
            value={Q.type}
            onChange={e => this.props.ChangeTypeHandler(index, e.target.value)}
          >
            <option value={Qtypes.TEXT}>short answer</option>
            <option value={Qtypes.MULTIPLE_CHOISE}>multiple choise</option>
            <option value={Qtypes.RADIO_GROUP}>radio Group</option>
            <option value={Qtypes.DROPDOWN_MENU}>Dropdown Menu</option>
          </select>
        </div>
        <div className={styleClass.Answer}>{AnswerType}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Qs: state.createSurvey.Questions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ChangeLabelHandler: (index, newVal) =>
      dispatch({
        type: actions.CHANGE_QUESTION_TITLE,
        index: index,
        val: newVal
      }),
    ChangeTypeHandler: (index, newVal) =>
      dispatch({
        type: actions.CHANGE_QUESTION_TYPE,
        index: index,
        val: newVal
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
