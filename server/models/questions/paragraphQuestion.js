const Joi = require('joi')
const Question = require('./question')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class ParagraphQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_PARAGRAPH
        this.content = {
            placeHolder: props.content.placeHolder || '',
            min: props.content.min || 0,
            max: props.content.max || 1024
        }
    }

    static validate(paragraphQuestion) {
        const result = Joi.validate(paragraphQuestion, Questions.paragraphQuestionSchema)
        return result
    }
}

module.exports = ParagraphQuestion