import React, { Component } from "react";

import SurveyTitle from "../../Components/SurveyTitle/SurveyTitle";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import {
  AddQuestion,
  SubmitNewSurvey,
  ChangeTitle
} from "../../store/actions/BuilderAction";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import AddQuestionFloating from "../../Components/AddQuestionFloating/AddQuestionFloating";
import * as Qtypes from "../../Components/Question/QuestionTypes";

class SurveyBuilder extends Component {
  state = {
    showSideEditor: false,
    focusedQuestion: 0,
    submitting: false
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
  SubmittingHandler = newVal => {
    // console.log(newVal);
    this.setState({
      submitting: newVal
    });
  };

  render() {
    const Qs = this.props.pages[0].questions;
    let Questions = [];
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
            <SurveyTitle
              value={this.props.title}
              changed={e => this.props.ChangeTitle(e.target.value)}
            />
            {Questions}
            <div className={styleClass.SurveyTitle}>
              <MDBBtn
<<<<<<< HEAD
                onClick={() => this.props.SubmitNewSurvey(this.props.create, window.setTimeout(() => this.props.history.push(`/surveys`),2000))}
=======
               disabled = { this.state.submitting}
                onClick={() => {
                  this.setState(
                    { submitting: true },
                    this.props.SubmitNewSurvey(
                      this.props.create,
                      this.SubmittingHandler,
                      window.setTimeout(
                        () => this.props.history.push(`/surveys`),
                        1000
                      )
                    )
                  );
                }}
>>>>>>> 76209ffa471bd74e4e74f8f24d4af3f5ac77fca6
              >
                SUBMIT
              </MDBBtn>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      PageContent = (
        <SurveyBuilderWelcome
          clicked={() => this.props.AddQuestion(Qtypes.TEXT)}
        />
      );
    }

    return (
      <React.Fragment>
        <AddQuestionFloating text="Add Question" />
        <Layout>{PageContent}</Layout>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    create: state.createSurvey,
    pages: state.createSurvey.pages,
    title: state.createSurvey.title
  };
};

export default connect(
  mapStateToProps,
  { AddQuestion, ChangeTitle, SubmitNewSurvey }
)(SurveyBuilder);
