import React, { Component } from 'react'
import MultipleChoice from '../answerTypes/multiplechoice'
import ShortText from '../answerTypes/shortText';
import Paragraph from '../answerTypes/paragraph';
import Range from '../answerTypes/range';
import Rating from '../answerTypes/rating';
import Slider from '../answerTypes/slider';
import Dropdown from '../answerTypes/dropdownmenu'
import {connect} from 'react-redux';
import {addquestion} from '../../../store/actions/answersAction'
/************************ */
/*single question to fill */
/************************ */
class SurveyPage extends Component {
    state = {
        questionId: this.props.id,
        type: "",
        content: { value: "" }

    }
   
    onAnswerChange = (value) => {
        this.setState({ content: { value: value } },() => this.props.addquestion(this.state))
    }
    render() {
        const { answerObjectType, title,number } = this.props
        let answer = null;

        switch (answerObjectType) {
            case 'QUESTION_CHECKBOX':
               // this.setState({ type: "ANSWER_MULTIPLE_CHOICE" })
                answer = <MultipleChoice change={this.onAnswerChange} />
                break;
            case "QUESTION_TEXT":
                answer = <ShortText change={this.onAnswerChange} />
                break;
            case "QUESTION_DROPDOWN":
                answer = <Dropdown />
                break;
            case "QUESTION_PARAGRAPH":
                answer = <Paragraph change={this.onAnswerChange} />
                break;
           
                case "QUESTION_RATING":
                answer = <Rating change={this.onAnswerChange} />
                break;
            // case "QUESTION_RANGE":
            //     answer = <Range change={this.onAnswerChange}/>
            //     break;
            case "QUESTION_SLIDER":
                answer = <Slider change={this.onAnswerChange} />
                break;
            default:
                answer = <ShortText change={this.onAnswerChange} />

        }
        return (
       
            <div>
            <div className="card">
                <div className="card-header">


                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <h3 style={{ textAlign: 'left' }}><strong>Question {number}:</strong> {title}</h3>
                    </blockquote>
                </div>
            </div>
            <br />

            <div >
                
                <cite >Your Answer</cite>
                {answer}


            </div>
        </div>
        )
    }
}
const mapStateToProps = state =>{
  return{
      newState : state.questionAnswer.answers
      
}  
}
export default connect(mapStateToProps,{addquestion})(SurveyPage);