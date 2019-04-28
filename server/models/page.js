const _ = require('lodash')
const Element = require('./element')
const Question = require('./question')
const TextQuestion = require('./textQuestion')
const ParagraphQuestion = require('./paragraphQuestion')
const RadioGroupQuestion = require('./radioGroupQuestion')
const CheckBoxQuestion = require('./checkBoxQuestion')
const DropDownQuestion = require('./dropDownQuestion')
const SliderQuestion = require('./sliderQuestion')
const RatingQuestion = require('./ratingQuestion')
const RangeQuestion = require('./rangeQuestion')
const types = require('./types')

class Page extends Element {
    constructor(props) {
        super(props)
        this.title = props.title || ''
        this.description = props.description || ''
        this.questions = []
        if (props.questions && _.isArray(props.questions)) {
            props.questions.forEach(q => {
                this.addQuestion(q)
            });
        }
    }

    addQuestion(question) {
        if (question instanceof Question) {
            this.questions.push(question)
            return
        }

        switch (question.type) {
            case types.QUESTION_TEXT:
                question = new TextQuestion(question)
                break

            case types.QUESTION_PARAGRAPH:
                question = new ParagraphQuestion(question)
                break

            case types.QUESTION_RADIO_GROUP:
                question = new RadioGroupQuestion(question)
                break

            case types.QUESTION_CHECKBOX:
                question = new CheckBoxQuestion(question)
                break

            case types.QUESTION_DROPDOWN:
                question = new DropDownQuestion(props)
                break

            case types.QUESTION_SLIDER:
                question = new SliderQuestion(props)
                break

            case types.QUESTION_RATING:
                question = new RatingQuestion(props)
                break

            case types.QUESTION_RANGE:
                question = new RangeQuestion(props)
                break
        }

        if (question instanceof Question)
            this.questions.push(question)
    }
}

module.exports = Page