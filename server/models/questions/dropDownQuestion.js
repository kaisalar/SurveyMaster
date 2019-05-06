const Joi = require('joi')
const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class DropDownQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_DROPDOWN
    }

    static validate(dropDownQuestion) {
        const result = Joi.validate(dropDownQuestion, Questions.dropDownQuestionSchema)
        return result
    }
}

module.exports = DropDownQuestion