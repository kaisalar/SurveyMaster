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
import AddQuestionFloating from "../../Components/AddQuestionFloating/AddQuestionFloating";

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
    let sideEditor = null;
    let PageContent;
    if (Qs.length > 0) {
      Questions = Qs.map((_, index) => {
        return (
          <Question
            key={index}
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
      <React.Fragment>
        <AddQuestionFloating text="Add Question"/>
        <MDBRow>
          {sideEditor}
          <MDBCol>
            <Layout sideOpened={/*this.state.showSideEditor*/ false}>
              {PageContent}
            </Layout>
          </MDBCol>
        </MDBRow>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    create: state.createSurvey,
    pages: state.createSurvey.pages
  };
};

export default connect(
  mapStateToProps,
  { AddQuestion,SubmitNewSurvey }
)(SurveyBuilder);
