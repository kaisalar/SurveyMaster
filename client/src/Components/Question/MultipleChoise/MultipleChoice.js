import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/types'

class multipleChoise extends Component {
  render() {
    const Choices = this.props.Qs[this.props.index].content.choices.map((el,id) => <MDBInput key={id} label={el} value={el} onChange={e => this.props.changeChoiseHandler(this.props.index,id,e.target.value)}/>)
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
