const Joi = require('joi')
const Question = require('./question')
const types = require('./types')
const { Questions } = require('./validationSchemas')

class TextQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_TEXT
        if(props.content)
            this.content = {
                placeHolder: props.content.placeHolder || '',
                inputType: props.content.inputType || types.INPUT_TEXT,
                min: props.content.min || 0,
                max: props.content.max || 0
            }
    }

    static validate(textQuestion) {
        const result = Joi.validate(textQuestion, Questions.textQuestionSchema)
        return result
    }
}

module.exports = TextQuestion