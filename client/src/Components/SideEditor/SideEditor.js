import React, { Component } from "react";
import styleClass from "./SideEditor.module.css";
import { connect } from "react-redux";
import BackDrop from "./BackDrop/BackDrop";

class SideEditor extends Component {
  state = {};
  render() {
    const Qs = this.props.pages[0].questions
    return (
      <React.Fragment>
        <BackDrop clicked = {this.props.HideSideEditor}/>
        <div className={styleClass.SideEditor}>
          <h1>Your Question ID: {Qs[this.props.index].title}</h1>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    pages: state.createSurvey.pages
  };
};

export default connect(mapStateToProps)(SideEditor);
