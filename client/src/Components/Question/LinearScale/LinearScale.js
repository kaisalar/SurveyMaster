import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBRow, MDBCol, MDBInput } from "mdbreact";
import * as actions from "../../../store/actions/types";


class LinearScale extends Component {
  state = {};
  render() {
    const index = this.props.index;
    const content = this.props.pages[0].questions[index].content;
    console.log(content)
    return (
      <div>
        <MDBRow>
          <MDBCol>
            <MDBInput
              label="Minimum"
              size="sm"
              type="number"
              value={content.min}
              onChange={e => this.props.ChangeMinHandler(index, e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              label="Maximum"
              size="sm"
              type="number"
              value={content.max}
              onChange={e => this.props.ChangeMaxHandler(index, e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              label="Steps"
              size="sm"
              type="number"
              value={content.step}
              onChange={e => this.props.ChangeStepHandler(index, e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              label="Default Value"
              size="sm"
              type="number"
              value={content.defalutValue}
              onChange={e => this.props.ChangeDefaultValueHandler(index, e.target.value)}
            />
          </MDBCol>
        </MDBRow>
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
        ChangeMinHandler:(index, newVal) => dispatch({
            type: actions.CHANGE_LINEAR_CONTENT,
            content: actions.CHANGE_MIN_VALUE,
            index: index,
            val: newVal,

        }) ,
        ChangeMaxHandler: (index, newVal) => {
            console.log('nax')
            dispatch({
            type: actions.CHANGE_LINEAR_CONTENT,
            content: actions.CHANGE_MAX_VALUE,
            index: index,
            val: newVal,

        })},
        ChangeStepHandler: (index, newVal) => dispatch({
            type: actions.CHANGE_LINEAR_CONTENT,
            content: actions.CHANGE_STEP_VALUE,
            index: index,
            val: newVal,

        }),
        ChangeDefaultValueHandler: (index, newVal) => dispatch({
            type: actions.CHANGE_LINEAR_CONTENT,
            content: actions.CHANGE_DEFAULT_VALUE,
            index: index,
            val: newVal,

        }),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LinearScale);
