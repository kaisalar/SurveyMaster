import React from 'react'
import MultipleChoice from '../answerTypes/multiplechoice'
import ShortText from '../answerTypes/shortText';
import Paragraph from '../answerTypes/paragraph';
import Range from '../answerTypes/range';
import Rating from '../answerTypes/rating';
import Slider from '../answerTypes/slider';
/************************ */
/*single question to fill */
/************************ */
const fill_item = props => {
    let answer = null;
    switch (props.answerObjectType) {
        case 'multiplechoice':
            answer = <MultipleChoice />
            break;
        case "QUESTION_TEXT":
            answer = <ShortText />
            break;
        case "paragraph":
            answer = <Paragraph />
            break;
        case "rating":
            answer = <Rating />
            break;
        case "range":
            answer = <Range />
            break;
        case "QUESTION_SLIDER": 
            answer = <Slider/>
            break;
        default:
            answer = <ShortText />

    }
    return (<div>
        <div className="card">
            <div className="card-header">
                
               
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <h3><strong>Question: </strong> {props.title}</h3>
                    <footer className="blockquote-footer">Someone famous in<cite title="Source Title">Source Title</cite></footer>
                </blockquote>
            </div>
        </div>
        <br />

        <div className="form-group">
            <p >Your Answer</p>
            {answer}
           

        </div>
    </div>)
}
export default fill_item;