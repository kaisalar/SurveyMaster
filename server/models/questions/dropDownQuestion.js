const Joi = require('joi')
const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class DropDownQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_CHECKBOX
    }

    static validate(dropDownQuestion) {
        const result = Joi.validate(dropDownQuestion, Questions.dropDownQuestionSchema)
        return result
    }
}

module.exports = DropDownQuestionpDownQuestion