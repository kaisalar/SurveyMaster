const Joi = require('joi')
const Question = require('./question')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class RangeQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_RANGE
        this.content = {
            min: props.content.min || 0,
            max: props.content.max || 5,
            minLabel: props.content.minLabel || 'minimum',
            maxLabel: props.content.maxLabel || 'maximum',
            minDefaultValue: props.content.minDefaultValue || props.content.min,
            maxDefaultValue: props.content.maxDefaultValue || props.content.max,
            step: props.content.step || 1 // if -1 -> there is no step
        }
    }

    static validate(rangeQuestion) {
        const result = Joi.validate(rangeQuestion, Questions.rangeQuestionSchema)
        return result
    }
}

module.exports = RangeQuestion