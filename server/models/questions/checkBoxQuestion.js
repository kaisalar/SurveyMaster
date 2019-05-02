const Joi = require('joi')
const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class CheckBoxQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_CHECKBOX
    }

    static validate(checkBoxQuestion) {
        const result = Joi.validate(checkBoxQuestion, Questions.checkBoxQuestionSchema)
        return result
    }
}

module.exports = CheckBoxQuestion