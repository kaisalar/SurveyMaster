const Joi = require('joi')
const Answer = require('./answer')
const types = require('./types')
const { Answers } = require('./validationSchemas')

class MultipleChoiceAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_MULTIPLE_CHOICE
        this.content = {
            choices: props.content.choices || []
        }
    }

    static validate(multipleChoiceAnswer) {
        const result = Joi.validate(multipleChoiceAnswer, Answers.multipleChoiceAnswerSchema)
        return result
    }
}

module.exports = MultipleChoiceAnswer