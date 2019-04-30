const Joi = require('joi')
const Answer = require('./answer')
const types = require('./types')
const { Answers } = require('./validationSchemas')

class TextAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_TEXT
        this.content = {
            value: props.content.value || ''
        }
    }

    static validate(textAnswer) {
        const result = Joi.validate(textAnswer, Answers.textAnswerSchema)
        return result
    }
}

module.exports = TextAnswer