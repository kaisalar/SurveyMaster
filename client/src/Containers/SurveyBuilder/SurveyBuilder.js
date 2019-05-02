import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import styleClass from "./SurveyBuilder.module.css";
import * as actions from "../../store/actions/types";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
class SurveyBuilder extends Component {
  state = {
    Questions: []
  };

  findQuestionIndex = id => {
    let QuestionID = this.state.Questions.findIndex(p => {
      return p._id === id;
    });
    return QuestionID;
  };

  ChangeLabelHandler = (event, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    newQuestions[QuestionID].title = event.target.value;
    this.setState({ Questions: newQuestions });
  };
  ChangeTypeHandler = (event, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    newQuestions[QuestionID].type = event.target.value;
    this.setState({ Questions: newQuestions });
  };
  changeChoiseHandler = (event, ChoiseID, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    console.log(event, ChoiseID, id);
    newQuestions[QuestionID].content.choices[ChoiseID] = event.target.value;
    this.setState({ Questions: newQuestions });
  };

  render() {
    let Questions = this.props.Qs.map(el => (
      <Question
        key={el._id}
        index={el._id - 1}
        type={el.type}
        typeChanged={event => this.ChangeTypeHandler(event, el._id)}
        title={el.title}
        labelChanged={event => this.ChangeLabelHandler(event, el._id)}
        content={el.content}
        choiseChanged={(event, id) =>
          this.changeChoiseHandler(event, id, el._id)
        }
      />
    ));
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
