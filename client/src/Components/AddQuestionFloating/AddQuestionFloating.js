import React from "react";
import { SelectPicker } from "rsuite";
import data from "../Question/QuestionsData";
import "./AddQuestionFloating.css";
import {
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdown
} from "mdbreact";
import { connect } from "react-redux";
import * as actions from "../../store/actions/types";

const AddQuestionFloating = props => {
  let items = data.map((el, i, arr) => {
    if (i > 0 && arr[i - 1].role !== arr[i].role) {
      return (
        <React.Fragment key={i}>
          <MDBDropdownItem divider />
          <MDBDropdownItem
            
            onClick={() => {
              props.AddQuestion(el.value);
            }}
          >
            {el.label}
          </MDBDropdownItem>
        </React.Fragment>
      );
    }
    return (
      <MDBDropdownItem
        key={i}
        onClick={() => {
          props.AddQuestion(el.value);
        }}
      >
        {el.label}
      </MDBDropdownItem>
    );
  });
  return (
    <div className="floating-select-picker">
      <MDBDropdown>
        <MDBDropdownToggle>
          <MDBIcon icon="plus" />
        </MDBDropdownToggle>
        <MDBDropdownMenu>{items}</MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    AddQuestion: type =>
      dispatch({
        type: actions.ADD_QUESTION,
        Qtype: type
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddQuestionFloating);
