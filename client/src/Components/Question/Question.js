import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Question.module.css";
import TextAnswer from "./TextAnswer/TextAnswer";
import MultipleChoice from "./MultipleChoise/MultipleChoice";
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
    let Style = null;
    if (this.state.mouseHover) {
      Style = {
        boxShadow: "0px 0px 5px 5px rgba(0, 0, 255, .1)"
      };
    }

    let AnswerType;
    const index = this.props.index;
    const Q = this.props.Qs[index];
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
      default:
        AnswerType = <TextAnswer index={index} />;
        break;
    }
    const data = [
      { label: "Short Text", value: Qtypes.TEXT,role: "Text Answer" },
      { label: "Paragraph", value: Qtypes.PARAGRAPH,role: "Text Answer" },
      { label: "Radio Group", value: Qtypes.RADIO_GROUP,role: "Muliple Choise"  },
      { label: "Checkbox", value: Qtypes.CHECKBOX,role: "Muliple Choise" },
      { label: "Dropdown Menu", value: Qtypes.DROPDOWN,role: "Muliple Choise" }
    ];
    return (
      <div
        className={styleClass.QuestionContainer}
        style={Style}
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
