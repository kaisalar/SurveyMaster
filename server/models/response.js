const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Answer = require('./answer')
const TextAnswer = require('./textAnswer')
const MultipleChoiceAnswer = require('./multipleChoiceAnswer')
const SingleNumberValueAnswer = require('./singleNumberValueAnswer')
const RangeAnswer = require('./rangeAnswer')
const types = require('./types')
const { responseSchema } = require('./validationSchemas')

class Response extends Element {
    constructor(props) {
        super(props)
        this.surveyId = props.surveyId
        this.date = props.date || Date.now()
        this.answers = []
        if (props.answers && _.isArray(props.answers)) {
            props.answers.forEach(a => {
                this.addAnswer(a)
            });
        }
    }

    addAnswer(answer) {
        if (answer instanceof Answer) {
            this.answers.push(answer)
            return
        }

        switch (answer.type) {
            case types.ANSWER_TEXT:
                answer = new TextAnswer(answer)
                break

            case types.ANSWER_MULTIPLE_CHOICE:
                answer = new MultipleChoiceAnswer(answer)
                break

            case types.ANSWER_SINGLE_NUMBER_VALUE:
                answer = new SingleNumberValueAnswer(answer)
                break

            case types.ANSWER_RANGE:
                answer = new RangeAnswer(answer)
                break
        }

        if (answer instanceof Answer) {
            this.answers.push(answer)
        }
    }

    static validate(response) {
        const result = Joi.validate(response, responseSchema)
        return result
    }
}

module.exports = Response