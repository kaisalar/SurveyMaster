const Joi = require('joi')
const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class RadioGroupQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_RADIO_GROUP
    }

    static validate(radioGroupQuestion) {
        const result = Joi.validate(radioGroupQuestion, Questions.radioGroupQuestionSchema)
        return result
    }
}

module.exports = RadioGroupQuestion