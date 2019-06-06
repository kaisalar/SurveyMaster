import React, { Component } from "react";
import "./Response.css";
import SurveyFill_item from "../../SurveyAnswersList/SurveyFill_Item/SurveyFill_item";
class Response extends Component {
  //   state = {
  //     dataLoaded: false
  //   };
  //   dataLoadedHandler = newVal => {
  //       this.setState({
  //           dataLoaded: newVal
  //       })
  //   }

  render() {
    let data = null,response = null,responseClass = "response no-data"
    if (this.props.data) {
      data = this.props.data.map((question, i) => (
        <SurveyFill_item
          key={i}
          id={question._id}
          number={i + 1}
          title={question.title}
          answerObjectType={question.type}
          content={question.content}
        />
      ));
      response = <div className="list">{data}</div>
      responseClass = "response"
    }
    return (
        <div className={responseClass}>
            <h2>{this.props.data ? "Response" : "Click on Any Response To Load Data"}</h2>
            {response}
        </div>
    
        );
  }
}

export default Response;
