import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/types'

class multipleChoise extends Component {
  render() {
    const index = this.props.index
    const choices = this.props.Qs[index].content.choices
    const Choices = choices.map((el,id) => <MDBInput key={id} label={el} value={el} onChange={e => this.props.changeChoiseHandler(index,id,e.target.value)}/>)
    return (
      <React.Fragment>
       {Choices}
      </React.Fragment>
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
    changeChoiseHandler: (index, choiceIndex, newVal) => dispatch({ type: actions.CHANGE_CHOISE_LABEL,index: index,choiceIndex: choiceIndex,  val: newVal })
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(multipleChoise);
