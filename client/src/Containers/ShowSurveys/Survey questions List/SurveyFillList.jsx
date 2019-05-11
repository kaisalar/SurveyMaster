import React, { Component } from "react";
import axios from "../../../axios-requests";
import Question from "../../../Components/SurveyAnswersList/SurveyFill_Item/SurveyFill_item";
import {
  previewSurvey,
  postAnswers
} from "../../../store/actions/answersAction";
import ReactFullpage from "@fullpage/react-fullpage";
import { connect } from "react-redux";
import Loader from '../../../Components/UI/Loader/Loader'
import { Alert } from "rsuite";
import styles from "./SurveyFillList.module.css";
import { MDBBtn } from "mdbreact";
/**************** */
/* using answersAction here  */
/* whole questions for a single survey*/
/************* */
class SurveyFillList extends Component {
  state = {
    redirect: false,
    dataLoaded: false
  };
  componentDidMount() {
    this.props.previewSurvey(
      this.props.match.params.id,
      this.dataLoadedHandler
    );
  }
  dataLoadedHandler = newVal => {
    this.setState({
      dataLoaded: newVal
    });
    console.log(this.state.dataLoaded);
  };
  onSubmitHandler = () => {
      console.log(this.props.answers)
    this.props.postAnswers(this.props.answers, this.props.id);
    Alert.success("Thanks For your Time , Your Opinion is priceless :)");
    window.setTimeout(() => this.setState({ redirect: true }), 2000);
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
    let Content = <Loader />;
    if (this.state.dataLoaded) {
      let Qs = surveyPages.map(page => {
        return page.questions.map((question, i) => {
          return (
            <Question
              key={i}
              id={question._id}
              surveyId={id}
              number={i + 1}
              title={question.title}
              answerObjectType={question.type}
              content={question.content}
            />
          );
        });
      });
      Qs.push(<div className="section"><MDBBtn onClick={this.onSubmitHandler}>SUBMIT</MDBBtn></div>)
      Content = (
        <ReactFullpage
          render={({}) => {
            return <ReactFullpage.Wrapper>{Qs}</ReactFullpage.Wrapper>;
          }}
        />
      );
    }
    return (
      <div className={styles.Newlayout}>
        <div className={styles.SurveyTitle}>
          <h1>{title}</h1>
        </div>
        {Content}
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
