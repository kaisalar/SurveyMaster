const Joi = require('joi')
const Question = require('./question')
const types = require('../types')
const { Questions } = require('../validationSchemas')

class UploadFileQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_UPLOADFILE;
    }

    static validate(textQuestion) {
        const result = Joi.validate(textQuestion, Questions.textQuestionSchema)
        return result
    }
}

module.exports = UploadFileQuestion