import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import SideEditor from "../../Components/SideEditor/SideEditor";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import * as actions from "../../store/actions/types";
import { MDBBtn, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";

class SurveyBuilder extends Component {
  state = {
    showSideEditor: false,
    focusedQuestion: 0
  };
  showSideEditorHandler = index => {
    this.setState({
      showSideEditor: true,
      focusedQuestion: index
    });
  };
  render() {
    let Questions = [];
    let sideEditor = this.state.showSideEditor ? <MDBCol size="3"><SideEditor index={this.state.focusedQuestion}/> </MDBCol>: null;
    let PageContent;
    if (this.props.Qs.length > 0) {
      Questions = this.props.Qs.map((el, index) => {
        return (
          <Question
            key={el._id}
            index={index}
            clicked={() => this.showSideEditorHandler(index)}
          />
        );
      });
      PageContent = (
        <React.Fragment>
          <div className={styleClass.SurveyBuilder + " " }>
            <CreateQuestion clicked={this.props.addNewQuestion} />
            {Questions}
            <div className={styleClass.CreateQuestion}>
              <MDBBtn gradient="blue">SUBMIT</MDBBtn>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      PageContent = (
        <SurveyBuilderWelcome clicked={this.props.addNewQuestion} />
      );
    }

    return (
      <MDBRow>
        {/* {sideEditor} */}
        <MDBCol> 
        <Layout sideOpened={/*this.state.showSideEditor*/false}>{PageContent}</Layout>
        </MDBCol>
      </MDBRow>
      // <React.Fragment>
      // </React.Fragment>
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
    addNewQuestion: () => dispatch({ type: actions.ADD_QUESTION })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyBuilder);
