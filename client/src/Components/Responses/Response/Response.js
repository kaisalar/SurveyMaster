import React, { Component } from "react";
import "./Response.css";
import SurveyFillitem from "../../SurveyAnswersList/SurveyFill_Item/SurveyFill_item";
class Response extends Component {
  render() {
    let data = null,response = null,responseClass = "response no-data"
    if (this.props.data) {
        data = this.props.data.map((el, i) => (
        <SurveyFillitem
          key={i}
          id={el.question._id}
          number={i + 1}
          title={el.question.title}
          answerObjectType={el.question.type}
          content={el.question.content}
          isResponse
          answer={el.content}
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
