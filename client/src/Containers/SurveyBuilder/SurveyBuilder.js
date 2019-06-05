import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

import SurveyTitle from "../../Components/SurveyTitle/SurveyTitle";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import {AddQuestion,SubmitNewSurvey,ChangeTitle} from "../../store/actions/BuilderAction";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import AddQuestionFloating from "../../Components/AddQuestionFloating/AddQuestionFloating";
import * as Qtypes from "../../Components/Question/QuestionTypes";


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
            <SurveyTitle value={this.props.title} changed={(e) => this.props.ChangeTitle(e.target.value)}/>
            {Questions}
            <div className={styleClass.SurveyTitle}>
              <MDBBtn
                gradient="blue"
                onClick={() => this.props.SubmitNewSurvey(this.props.create, window.setTimeout(() => this.props.history.push(`/surveys`),1000))}
              >
                SUBMIT
              </MDBBtn>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      PageContent = (
        <SurveyBuilderWelcome clicked={() => this.props.AddQuestion(Qtypes.TEXT)} />
      );
    }

    return (
      <React.Fragment>
        <AddQuestionFloating text="Add Question"/>
            <Layout sideOpened={/*this.state.showSideEditor*/ false}>
              {PageContent}
            </Layout>
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
  { AddQuestion,ChangeTitle,SubmitNewSurvey }
)(SurveyBuilder);
