import React, { Component } from "react";
import axios from "../../../axios-requests";
import Question from "../../../Components/SurveyAnswersList/SurveyFill_Item/SurveyFill_item";
import {
  previewSurvey,
  postAnswers
} from "../../../store/actions/answersAction";
import ReactFullpage from "@fullpage/react-fullpage";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import styles from "./SurveyFillList.module.css";
/**************** */
/* using answersAction here  */
/* whole questions for a single survey*/
/************* */
class SurveyFillList extends Component {
  componentDidMount() {
    this.props.previewSurvey(this.props.match.params.id);
  }
  onSubmitHandler = () => {
    this.props.postAnswers(this.props.answers, this.props.id);
  };

  submitAnswers = () => {
    let answer = this.state.answer;
    axios.post("/filling/", answer).then(response => console.log(response));
  };
  getAnswerHandler = event => {
    this.setState({ answer: event.target.value });
  };
  render() {
    //    console.log("new State in SurveyFillList.jsx", this.props)
    const { id, title, surveyPages } = this.props;
    console.log(this.props);
    let questions = surveyPages.map(page => {
      return page.questions;
    });
    console.log(questions)

    return (
      <div className={styles.Newlayout}>
        <div className={styles.SurveyTitle}>
          <h1>{title}</h1>
        </div>
        {/* <ReactFullpage
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <Question
                  key={0}
                  id={questions[0]._id}
                  surveyId={id}
                  number={1}
                  title={questions[0].title}
                  answerObjectType={questions[0].type}
                  content={questions[0].content}
                />
              </ReactFullpage.Wrapper>
            );
          }}
        /> */}

        <div className={styles.SuveyContainer} />
        <MDBBtn
          gradient="blue"
          style={{ color: "White", borderRadius: "5px" }}
          onClick={this.onSubmitHandler}
        >
          submit
        </MDBBtn>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    surveyPages: state.fillSurvey.pages,
    id: state.fillSurvey._id,
    date: state.fillSurvey.date,
    title: state.fillSurvey.title,
    answers: state.questionAnswer
  };
};
export default connect(
  mapStateToProps,
  { previewSurvey, postAnswers }
)(SurveyFillList);
