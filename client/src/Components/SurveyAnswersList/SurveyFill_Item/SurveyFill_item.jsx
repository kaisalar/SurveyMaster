import React, { Component } from "react";
import CheckBox from "../answerTypes/multiplechoice";
import ShortText from "../answerTypes/shortText";
import Paragraph from "../answerTypes/paragraph";
import Range from "../answerTypes/range";
import Rating from "../answerTypes/rating";
import Slider from "../answerTypes/slider";
import Dropdown from "../answerTypes/dropdownmenu";
import * as Qtype from "../../Question/QuestionTypes";
import * as Atype from "../../../store/actions/types";
import { connect } from "react-redux";
import { addquestion } from "../../../store/actions/answersAction";
import RadioButton from "../answerTypes/radioGroup";
import styleClass from "./SurveyFll_item.module.css";
import "./style.css";
import RatingNumbers from '../answerTypes/ratingNumbers';
import _ from 'lodash'
/************************ */
/*single question to fill */
/************************ */
class SurveyPage extends Component {
  constructor(props) {
    super(props);
    this.localState = {
      survey_id: this.props.surveyId,

      info: {
        questionId: this.props.id,
        type: "",
        content: {}
      }
    };
  }

  onAnswerChange = (value) => {
    this.localState.info.content = value
    //console.log('value',value)
    this.props.addquestion(this.localState)
}
render() {
    const { answerObjectType, title, number,content } = this.props
    let answer = null;
    let info = this.localState.info
    switch (answerObjectType) {
        case Qtype.CHECKBOX :
            {
                info.type = Atype.ANSWER_MULTIPLE_CHOICE
          //      console.log('type', this.localState.type)
                answer = <CheckBox content={content}  change={this.onAnswerChange}  />
                break;
            }
        case Qtype.TEXT: {
            info.type = Atype.ANSWER_TEXT
            answer = <ShortText content={content} change={this.onAnswerChange} />
            break;
        }
        case Qtype.RADIO_GROUP:
            info.type = Atype.ANSWER_SINGLE_NUMBER_VALUE
            answer = <RadioButton content={content} change={this.onAnswerChange} />
            break;

        case Qtype.DROPDOWN:
            info.type = Atype.ANSWER_SINGLE_NUMBER_VALUE
            answer = <Dropdown content={content}  change={this.onAnswerChange} />
            break;
        case Qtype.PARAGRAPH: {
            info.type = Atype.ANSWER_TEXT

            answer = <Paragraph content={content}  change={this.onAnswerChange} />
            break;
        }
        case Qtype.RANGE:
            info.type =  Atype.ANSWER_RANGE
            answer = <Range content={content}  change={this.onAnswerChange} />
            break;
        case Qtype.RATING:
             info.type =  Atype.ANSWER_SINGLE_NUMBER_VALUE
            if (content.ratingType === "RATING_NUMBERS")
                answer = <RatingNumbers content={content} change={this.onAnswerChange} />
             else
            answer = <Rating  content={content} change={this.onAnswerChange} />
            break;
        case Qtype.SLIDER:
            info.type = Atype.ANSWER_SINGLE_NUMBER_VALUE
            answer = <Slider content={content} change={this.onAnswerChange} />
            break;
        default:
            info.type = Atype.ANSWER_TEXT

            answer = <ShortText content={content}  change={this.onAnswerChange} />

    }
return (
        <div className={styleClass.QuestionContainer}>
          <div className={styleClass.QuestionTitle}>
            <h3>{title}</h3>
          </div>
          <div className={styleClass.Answer}>{answer}</div>
        </div>
    );
  }
}

export default connect(
  null,
  { addquestion }
)(SurveyPage);
