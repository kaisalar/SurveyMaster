import React, { Component } from "react";
import SurveyTitle from "../../Components/SurveyTitle/SurveyTitle";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import {
  AddQuestion,
  SubmitNewSurvey,
  ChangeTitle,
  ChangeColor
} from "../../store/actions/BuilderAction";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import AddQuestionFloating from "../../Components/AddQuestionFloating/AddQuestionFloating";
import * as Qtypes from "../../Components/Question/QuestionTypes";
import ColorPicker from '../../Components/Colorpicker/Colorpicker'

class SurveyBuilder extends Component {
  state = {
    showSideEditor: false,
    focusedQuestion: 0,
    submitting: false,
  };
  componentWillUnmount() {
    document.body.style.backgroundColor = '#CCC1FF'
  }
  colorChanged = (newColor) => {
    document.body.style.backgroundColor = newColor
    console.log(newColor);
    this.props.ChangeColor(newColor)
  }
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
                disabled={this.state.submitting}
                onClick={() => {
                  this.setState(
                    { submitting: true },
                    this.props.SubmitNewSurvey(
                      this.props.create,
                      this.SubmittingHandler,
                      window.setTimeout(
                        () => this.props.history.push(`/surveys`),
                        2000
                      )
                    )
                  );
                }}
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
        <ColorPicker clicked={this.colorChanged}></ColorPicker>
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
  { AddQuestion, ChangeTitle, ChangeColor, SubmitNewSurvey }
)(SurveyBuilder);
