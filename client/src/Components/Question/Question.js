import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import TextAnswer from "./TextAnswer/TextAnswer";
import MultipleChoice from "./MultipleChoise/MultipleChoice";
import Data from "./QuestionsData";
import LinearScale from './LinearScale/LinearScale'
import { connect } from "react-redux";
import * as actions from "../../store/actions/types";
import * as Qtypes from "./QuestionTypes";
import { SelectPicker } from "rsuite";

class Question extends Component {
  state = {
    mouseHover: false
  };
  mouseHoverOn = () => {
    this.setState({
      mouseHover: true
    });
  };
  mouseHoverOff = () => {
    this.setState({
      mouseHover: false
    });
  };
  render() {
    const Qs = this.props.pages[0].questions;
    let AnswerType;
    const index = this.props.index;
    const Q = Qs[index];
    switch (Q.type) {
      case Qtypes.TEXT:
        AnswerType = (
          <TextAnswer index={index} type="text" label="Short Answer Text" />
        );
        break;
      case Qtypes.PARAGRAPH:
        AnswerType = (
          <TextAnswer index={index} type="textarea" label="Long Answer Text" />
        );
        break;
      case Qtypes.RADIO_GROUP:
        AnswerType = (
          <MultipleChoice index={index} type={Qtypes.RADIO_GROUP} />
        );
        break;
        case Qtypes.CHECKBOX:
        AnswerType = (
          <MultipleChoice index={index} type={Qtypes.CHECKBOX} />
        );
        break;
        case Qtypes.DROPDOWN:
        AnswerType = (
          <MultipleChoice index={index} type={Qtypes.DROPDOWN} />
        );
        break;
        case Qtypes.RATING:
        AnswerType = (
          <LinearScale index={index} type={Qtypes.RATING} />
        );
        break;
        case Qtypes.SLIDER:
        AnswerType = (
          <LinearScale index={index} type={Qtypes.SLIDER} />
        );
        break;
        case Qtypes.RANGE:
        AnswerType = (
          <LinearScale index={index} type={Qtypes.RANGE} />
        );
        break;
      default:
        AnswerType = <TextAnswer index={index} />;
        break;
    }
    const data = Data;
    return (
      <div
        className={styleClass.QuestionContainer}
        onMouseEnter={this.mouseHoverOn}
        onMouseLeave={this.mouseHoverOff}
        onClick={this.props.clicked}
      >
        <div className={styleClass.Question}>
          <MDBInput
            label="Enter Your Question Title"
            value={Q.title}
            onChange={e => this.props.ChangeLabelHandler(index, e.target.value)}
            className={styleClass.BigText}
          />
          <SelectPicker
            className={styleClass.SelectInput}
            data={data}
            appearance="subtle"
            groupBy="role"
            value={Q.type}
            searchable={false}
            cleanable={false}
            onChange={newVal => this.props.ChangeTypeHandler(index, newVal)}
          >
            {/* <option value={Qtypes.TEXT}>short answer</option>
            <option value={Qtypes.MULTIPLE_CHOISE}>multiple choise</option>
            <option value={Qtypes.RADIO_GROUP}>radio Group</option>
            <option value={Qtypes.DROPDOWN_MENU}>Dropdown Menu</option> */}
          </SelectPicker>
        </div>
        <div className={styleClass.Answer}>{AnswerType}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.createSurvey.pages
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
