import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import styleClass from "./SurveyBuilder.module.css";
import * as actions from "../../store/actions/types";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
class SurveyBuilder extends Component {
  render() {
    let Questions = [];
    let PageContent;
    if (this.props.Qs.length > 0) {
      Questions = this.props.Qs.map((el,index) => {
        return <Question key={el._id} index={index} />;
      });
      PageContent = (
        <div className={styleClass.SurveyBuilder}>
          <CreateQuestion clicked={this.props.addNewQuestion} />
          {Questions}
          <div className={styleClass.CreateQuestion}>
            <MDBBtn gradient="blue">SUBMIT</MDBBtn>
          </div>
        </div>
      );
    } else { 
      PageContent = (<SurveyBuilderWelcome clicked={this.props.addNewQuestion}/>)
    }

    return (
      <Layout>
        {PageContent}
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
