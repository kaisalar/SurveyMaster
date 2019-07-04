import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBRow, MDBCol, MDBInput } from "mdbreact";
import * as actions from "../../../store/actions/types";
import * as Qtypes from "../QuestionTypes";

class LinearScale extends Component {
  state = {};
  render() {
    const index = this.props.index;
    const content = this.props.pages[0].questions[index].content;
    const type = this.props.pages[0].questions[index].type;
    const minimum = (
      <MDBCol>
        <MDBInput
          label="Minimum"
          size="sm"
          type="number"
          value={content.min}
          onChange={e => this.props.ChangeMinHandler(index, e.target.value)}
        />
      </MDBCol>
    );
    const maximum = (
      <MDBCol>
        <MDBInput
          label="Maximum"
          size="sm"
          type="number"
          value={content.max}
          onChange={e => this.props.ChangeMaxHandler(index, e.target.value)}
        />
      </MDBCol>
    );
    const step = (
      type !== Qtypes.RATING ? 
      <MDBCol>
        <MDBInput
          label="Steps"
          size="sm"
          type="number"
          value={content.step}
          onChange={e => this.props.ChangeStepHandler(index, e.target.value)}
        />
      </MDBCol>
      : null
    );

    const defalutValue = (
      <MDBCol>
        <MDBInput
          label="Default Value"
          size="sm"
          type="number"
          value={content.defalutValue}
          onChange={e =>
            this.props.ChangeDefaultValueHandler(index, e.target.value)
          }
        />
      </MDBCol>
    );
    return (
      <div>
        <MDBRow>{minimum}{maximum}</MDBRow>
        <MDBRow>{step}{defalutValue}</MDBRow>
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
    ChangeMinHandler: (index, newVal) =>
      dispatch({
        type: actions.CHANGE_LINEAR_CONTENT,
        content: actions.CHANGE_MIN_VALUE,
        index: index,
        val: newVal
      }),
    ChangeMaxHandler: (index, newVal) => {
      dispatch({
        type: actions.CHANGE_LINEAR_CONTENT,
        content: actions.CHANGE_MAX_VALUE,
        index: index,
        val: newVal
      });
    },
    ChangeStepHandler: (index, newVal) =>
      dispatch({
        type: actions.CHANGE_LINEAR_CONTENT,
        content: actions.CHANGE_STEP_VALUE,
        index: index,
        val: newVal
      }),
    ChangeDefaultValueHandler: (index, newVal) =>
      dispatch({
        type: actions.CHANGE_LINEAR_CONTENT,
        content: actions.CHANGE_DEFAULT_VALUE,
        index: index,
        val: newVal
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinearScale);
