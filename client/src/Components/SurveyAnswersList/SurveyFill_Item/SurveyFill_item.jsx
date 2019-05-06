import React, { Component } from 'react'
import CheckBox from '../answerTypes/multiplechoice'
import ShortText from '../answerTypes/shortText';
import Paragraph from '../answerTypes/paragraph';
import Range from '../answerTypes/range';
import Rating from '../answerTypes/rating';
import Slider from '../answerTypes/slider';
import Dropdown from '../answerTypes/dropdownmenu'
import * as Qtype from '../../Question/QuestionTypes'
import * as Atype from '../../../store/actions/types'
import { connect } from 'react-redux';
import { addquestion, holdBackState } from '../../../store/actions/answersAction'
import RadioButton from '../answerTypes/radioGroup';
/************************ */
/*single question to fill */
/************************ */
class SurveyPage extends Component {
    state = {
        questionId: this.props.id,
        type: "",
        content: { value: "" }

    }
    constructor(props) {
        super(props);
        this.localState = {
            survey_id: this.props.surveyId,
            content: {
                questionId: this.props.id,
                type: "",
                content: { value: "" }
            }
        }

    }
    onSubmit = () => {
        this.props.holdBackState(this.localState);
    }
    onAnswerChange = (value) => {

        this.localState.content.content.value = value
        this.props.addquestion(this.localState)
    }
    render() {
        const { answerObjectType, title, number } = this.props
        let answer = null;
        let content = this.localState.content
        switch (answerObjectType) {
            case Qtype.CHECKBOX :
                {
                    content.type = Atype.ANSWER_MULTIPLE_CHOICE
                    console.log('type', this.localState.type)
                    answer = <CheckBox change={this.onAnswerChange} />
                    break;
                }
            case Qtype.TEXT: {
                content.type = Atype.ANSWER_TEXT
                answer = <ShortText change={this.onAnswerChange} />
                break;
            }
            case Qtype.RADIO_GROUP:
                content.type = Atype.ANSWER_MULTIPLE_CHOICE
                answer = <RadioButton change={this.onAnswerChange}/>
                break;

            case Qtype.DROPDOWN:
                content.type = Atype.ANSWER_MULTIPLE_CHOICE
                answer = <Dropdown change={this.onAnswerChange} />
                break;
            case Qtype.PARAGRAPH: {
                content.type = Atype.ANSWER_TEXT

                answer = <Paragraph change={this.onAnswerChange} />
                break;
            }
            case Qtype.RANGE:
                content.type =  Atype.ANSWER_RANGE
                answer = <Range change={this.onAnswerChange} />
                break;
            case Qtype.RATING:
                answer = <Rating change={this.onAnswerChange} />
                break;
            case Qtype.SLIDER:
                content.type = Atype.ANSWER_SINGLE_NUMBER_VALUE
                answer = <Slider change={this.onAnswerChange} />
                break;
            default:
                content.type = Atype.ANSWER_TEXT

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

export default connect(null, { addquestion, holdBackState })(SurveyPage);