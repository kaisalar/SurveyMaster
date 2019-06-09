const Joi = require('joi')
const Answer = require('./answer')
const types = require('../types')
const { Answers } = require('../validationSchemas')

class FileBase64Answer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_File_Base64;
        this.content = {
            value: props.content.value || ''
        }
    }

    static validate(Answer) {
        const result = Joi.validate(Answer, Answers.fileBase64AnswerSchema);
        return result;
    }
}

module.exports = FileBase64Answer