const Joi = require('joi')
const Answer = require('./answer')
const types = require('./types')
const { Answers } = require('./validationSchemas')

class SingleNumberValueAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_SINGLE_NUMBER_VALUE
        this.content = {
            value: props.content.value || 0
        }
    }

    static validate(singleNumberValueAnswer) {
        const result = Joi.validate(singleNumberValueAnswer, Answers.singleNumberValueAnswerSchema)
        return result
    }
}

module.exports = SingleNumberValueAnswer