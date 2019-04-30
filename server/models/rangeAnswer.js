const Joi = require('joi')
const Answer = require('./answer')
const types = require('./types')
const { Answers } = require('./validationSchemas')

class RangeAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_RANGE
        this.content = {
            minValue: props.content.minValue,
            maxValue: props.content.maxValue
        }
    }

    static validate(rangeAnswer) {
        const result = Joi.validate(rangeAnswer, Answers.rangeAnswerSchema)
        return result
    }
}

module.exports = RangeAnswer