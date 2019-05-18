import React, { Component } from "react";
import Choise from "./Choise/Choise";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/types";

class multipleChoice extends Component {
  keyPressedHandler = (event, index) => {
    if (event.key === "Enter") {
      this.props.addChoiceHandler(index);
    }
  };
  render() {
    const Qs = this.props.pages[0].questions
    const index = this.props.index;
    const choices = Qs[index].content.choices;
    let Choices = [];
    if (choices) {
      Choices = choices.map((el, id) => (
        <Choise
          key={id}
          index={index}
          id={id}
          el={el}
          type={this.props.type}
          keyPressedHandler={(e) => this.keyPressedHandler(e,index)}
          clicked={() => this.props.deleteChoiceHandler(index, id)}
          changeChoiseHandler={(newVal) =>
            this.props.changeChoiseHandler(index, id,newVal)
          }
        />
      ));
    }
    return <React.Fragment>{Choices}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    pages: state.createSurvey.pages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeChoiseHandler: (index, choiceIndex, newVal) =>
      dispatch({
        type: actions.CHANGE_CHOISE_LABEL,
        index: index,
        choiceIndex: choiceIndex,
        val: newVal
      }),
    addChoiceHandler: index =>
      dispatch({ type: actions.ADD_CHOICE, index: index }),
    deleteChoiceHandler: (index, choiceIndex) =>
      dispatch({
        type: actions.DELETE_CHOICE,
        index: index,
        choiceIndex: choiceIndex
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multipleChoice);
