import React, { Component } from "react";
import Choise from "./Choise/Choise";
import { MDBInput } from "mdbreact";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/types";

class multipleChoice extends Component {
  keyPressedHandler = (event, index) => {
    if (event.key === "Enter") {
      this.props.addChoiceHandler(index);
    }
  };
  render() {
    const index = this.props.index;
    const choices = this.props.Qs[index].content.choices;
    let Choices = [];
    if (choices) {
      Choices = choices.map((el, id) => (
        <Choise
          key={id}
          index={index}
          id={id}
          el={el}
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
    Qs: state.createSurvey.Questions
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
