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
import RadioButton from "../answerTypes/radioButton";
import styleClass from "./SurveyFll_item.module.css";
import "./style.css";
import RatingNumbers from "../answerTypes/ratingNumbers";
import LeftAlign from "../../UI/LeftAlign/LeftAlign";
/************************ */
/*single question to fill */
/************************ */
class SurveyPage extends Component {

    constructor(props) {
      
        super(props);
        this.localState = {
            survey_id: String(this.props.surveyId),

            info: {
                questionId: this.props.id,
              type:"",
                content: {}
            }
        }
        
     
    }
    onAnswerChange = value => {
      
    this.localState.info.content = value;
    //console.log('value',value)
    this.props.addquestion(this.localState);
  };
  render() {
    let titleClass = styleClass.QuestionTitle;
    if (this.props.isResponse) titleClass += (" " + styleClass.isResponse)
    const { answerObjectType, title,content } = this.props;
    let answer = null;
    let info = this.localState.info;
    console.log(answerObjectType)
    switch (answerObjectType) {
      case Qtype.CHECKBOX: {
        /// done
        info.type = Atype.ANSWER_MULTIPLE_CHOICE;
        answer = <LeftAlign><CheckBox content={content} change={this.onAnswerChange} /></LeftAlign>;
        this.props.addquestion(this.localState);
        break;
      }
      case Qtype.TEXT: {
        ///done 
        info.type = Atype.ANSWER_TEXT;
        answer = <LeftAlign><ShortText content={content} change={this.onAnswerChange} /></LeftAlign>;
        this.props.addquestion(this.localState);
        break;
      }
      case Qtype.RADIO_GROUP:
        ///done
        console.log(content)
        info.type = Atype.ANSWER_MULTIPLE_CHOICE;
        console.log("im in mc")
        answer = <LeftAlign><RadioButton content={content} change={this.onAnswerChange} /></LeftAlign>;
        this.props.addquestion(this.localState);
        break;

      case Qtype.DROPDOWN:
        info.type = Atype.ANSWER_MULTIPLE_CHOICE;
        answer = <Dropdown content={content} change={this.onAnswerChange} />;
        this.props.addquestion(this.localState);
        break;
      case Qtype.PARAGRAPH: {
        info.type = Atype.ANSWER_TEXT;
        answer = <LeftAlign><Paragraph content={content} change={this.onAnswerChange} /></LeftAlign>;
        this.props.addquestion(this.localState);
        break;
      }
      case Qtype.RANGE:
        info.type = Atype.ANSWER_RANGE;
        answer = <Range content={content} change={this.onAnswerChange} />;
        this.props.addquestion(this.localState);
        break;
      case Qtype.RATING:
        info.type = Atype.ANSWER_SINGLE_NUMBER_VALUE;
        if (content.ratingType === "RATING_NUMBERS"){
            console.log(content)
          answer = (
            <RatingNumbers content={content} change={this.onAnswerChange} />
            );
          }
        else answer = <Rating content={content} change={this.onAnswerChange} />;
        this.props.addquestion(this.localState);
        break;
      case Qtype.SLIDER:
        info.type = Atype.ANSWER_SINGLE_NUMBER_VALUE;
        answer = <Slider content={content} change={this.onAnswerChange} />;
        this.props.addquestion(this.localState);
        break;
      default:
        info.type = Atype.ANSWER_TEXT;

        answer = <LeftAlign><ShortText content={content} change={this.onAnswerChange} /></LeftAlign>;
        this.props.addquestion(this.localState);
      }
    return (
      <div className="section">
        <div className={styleClass.QuestionContainer + " question-container"}>
          <div className={titleClass}>
            <h3>{title}</h3>
          </div>
          <div className={styleClass.Answer}><React.Fragment>{answer}</React.Fragment></div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addquestion }
)(SurveyPage);
