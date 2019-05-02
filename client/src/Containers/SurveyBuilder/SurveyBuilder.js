import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import styleClass from "./SurveyBuilder.module.css";
import * as actions from "../../store/actions/types";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
class SurveyBuilder extends Component {

  findQuestionIndex = id => {
    let QuestionID = this.state.Questions.findIndex(p => {
      return p._id === id;
    });
    return QuestionID;
  };
  changeChoiseHandler = (event, ChoiseID, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    console.log(event, ChoiseID, id);
    newQuestions[QuestionID].content.choices[ChoiseID] = event.target.value;
    this.setState({ Questions: newQuestions });
  };

  render() {
    let Questions = this.props.Qs.map(el => {
      return(
      <Question
        key={el._id}
        index={el._id - 1}
        title={el.title}
        type={el.type}
        content={el.content}
      />
    )});
    return (
      <Layout>
        <div className={styleClass.SurveyBuilder}>
          <CreateQuestion clicked={this.props.addNewQuestion} />
          {Questions}
          <MDBBtn gradient="blue">Submit</MDBBtn>
        </div>
      </Layout>
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
