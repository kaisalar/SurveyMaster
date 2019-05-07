import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import {AddQuestion,SubmitNewSurvey} from "../../store/actions/BuilderAction";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import { MDBBtn, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import _ from "lodash";
import SideEditor from "../../Components/SideEditor/SideEditor";
import axios from "../../axios-requests";

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
  HideSideEditorHandler = () => {
    this.setState({
      showSideEditor: false
    });
  };

  render() {
    const Qs = this.props.pages[0].questions;
    let Questions = [];
    let sideEditor = this.state.showSideEditor ? (
      <MDBCol size="3">
        <SideEditor
          HideSideEditor={this.HideSideEditorHandler}
          index={this.state.focusedQuestion}
        />
      </MDBCol>
    ) : null;
    let PageContent;
    if (Qs.length > 0) {
      Questions = Qs.map((el, index) => {
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
          <div className={styleClass.SurveyBuilder + " "}>
            <CreateQuestion clicked={this.props.AddQuestion} />
            {Questions}
            <div className={styleClass.CreateQuestion}>
              <MDBBtn
                gradient="blue"
                onClick={() => this.props.SubmitNewSurvey(this.props.create)}
              >
                SUBMIT
              </MDBBtn>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      PageContent = (
        <SurveyBuilderWelcome clicked={this.props.AddQuestion} />
      );
    }

    return (
      <MDBRow>
        {sideEditor}
        <MDBCol>
          <Layout sideOpened={this.state.showSideEditor}>{PageContent}</Layout>
        </MDBCol>
      </MDBRow>
      // <React.Fragment>
      // </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    create: state.createSurvey,
    pages: state.createSurvey.pages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // addNewQuestion: () => ,
    // submitNewSurvey: 
  };
};

export default connect(
  mapStateToProps,
  { AddQuestion,SubmitNewSurvey }
)(SurveyBuilder);
