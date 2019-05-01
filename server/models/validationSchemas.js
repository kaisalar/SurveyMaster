const Joi = require('joi')
const types = require('./types')

const questionSchema = {
    title: Joi.string().max(1024).required(),
    description: Joi.string().max(1024).optional(),
}

const textQuestionSchema = {
    ...questionSchema,
    type: types.QUESTION_TEXT,
    content: {
        placeHolder: Joi.string().max(255).optional(),
        inputType: [types.INPUT_TEXT, types.INPUT_NUMERIC, types.INPUT_PHONE_NUMBER, types.INPUT_EMAIL],
        min: Joi.number().positive().optional(),
        max: Joi.number().positive().optional()
    }
}

const paragraphQuestionSchema = {
    ...questionSchema,
    type: types.QUESTION_PARAGRAPH,
    content: {
        placeHolder: Joi.string().max(255).optional(),
        min: Joi.number().positive().optional(),
        max: Joi.number().positive().optional()
    }
}

const multipleChoiceQuestionSchema = {
    ...questionSchema,
    content: {
        choices: Joi.array().items(Joi.string().required()).required()
    }
}

const radioGroupQuestionSchema = {
    ...multipleChoiceQuestionSchema,
    type: types.QUESTION_RADIO_GROUP
}

const checkBoxQuestionSchema = {
    ...multipleChoiceQuestionSchema,
    type: types.QUESTION_RADIO_GROUP
}

const dropDownQuestionSchema = {
    ...multipleChoiceQuestionSchema,
    type: types.QUESTION_DROPDOWN
}

const sliderQuestionSchema = {
    ...questionSchema,
    type: types.QUESTION_SLIDER,
    content: {
        min: Joi.number().required(),
        max: Joi.number().required(),
        minLabel: Joi.string().max(50).optional(),
        maxLabel: Joi.string().max(50).optional(),
        defaultValue: Joi.number().optional(),
        step: Joi.number().positive().required()
    }
}

const ratingQuestionSchema = {
    ...questionSchema,
    type: types.QUESTION_RATING,
    content: {
        ratingType: [types.RATING_NUMBERS, types.RATING_STARS],
        min: Joi.number().positive().required(),
        max: Joi.number().positive().required(),
        minLabel: Joi.string().max(50).optional(),
        maxLabel: Joi.string().max(50).optional(),
        defaultValue: Joi.number().positive().optional()
    }
}

const rangeQuestionSchema = {
    ...questionSchema,
    type: types.QUESTION_RANGE,
    content: {
        min: Joi.number().required(),
        max: Joi.number().required(),
        minLabel: Joi.string().max(50).optional(),
        maxLabel: Joi.string().max(50).optional(),
        minDefaultValue: Joi.number().required(),
        maxDefaultValue: Joi.number().required(),
        step: Joi.number().positive().required()
    }
}

const Questions = {
    textQuestionSchema: textQuestionSchema,
    paragraphQuestionSchema: paragraphQuestionSchema,
    radioGroupQuestionSchema: radioGroupQuestionSchema,
    checkBoxQuestionSchema: checkBoxQuestionSchema,
    dropDownQuestionSchema: dropDownQuestionSchema,
    sliderQuestionSchema: sliderQuestionSchema,
    ratingQuestionSchema: ratingQuestionSchema,
    rangeQuestionSchema: rangeQuestionSchema
}

const answerSchema = {
    questionId: Joi.string().uuid({ version: 'uuidv4' }).required()
}

const textAnswerSchema = {
    ...answerSchema,
    type: types.ANSWER_TEXT,
    content: {
        value: Joi.string().required()
    }
}

const multipleChoiceAnswerSchema = {
    ...answerSchema,
    type: types.ANSWER_MULTIPLE_CHOICE,
    content: {
        choices: Joi.array().items(Joi.string()).required()
    }
}

const singleNumberValueAnswerSchema = {
    ...answerSchema,
    type: types.ANSWER_SINGLE_NUMBER_VALUE,
    content: {
        value: Joi.number().required()
    }
}

const rangeAnswerSchema = {
    ...answerSchema,
    type: types.ANSWER_RANGE,
    content: {
        minValue: Joi.number().required(),
        maxValue: Joi.number().required()
    }
}

const Answers = {
    textAnswerSchema: textAnswerSchema,
    multipleChoiceAnswerSchema: multipleChoiceAnswerSchema,
    singleNumberValueAnswerSchema: singleNumberValueAnswerSchema,
    rangeAnswerSchema: rangeAnswerSchema
}

const pageSchema = {
    title: Joi.string().max(1024).optional(),
    description: Joi.string().max(1024).optional(),
    questions: Joi
        .array()
        .items(
            textQuestionSchema,
            paragraphQuestionSchema,
            radioGroupQuestionSchema,
            checkBoxQuestionSchema,
            dropDownQuestionSchema,
            ratingQuestionSchema,
            sliderQuestionSchema,
            rangeQuestionSchema
        )
        .optional()
}

const responseSchema = {
    surveyId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    date: Joi.date().optional(),
    answers: Joi
        .array()
        .items(
            textAnswerSchema,
            multipleChoiceAnswerSchema,
            singleNumberValueAnswerSchema,
            rangeAnswerSchema
        )
        .required()
}

const surveySchema = {
    title: Joi.string().max(1024).required(),
    description: Joi.string().max(1024).optional(),
    date: Joi.date().optional(),
    link: Joi.string().max(1024).optional(),
    pages: Joi.array().items(pageSchema).required()
}

function getErrorMessages(error) {
    const messages = error.details.map(detail => detail.message)
    return messages
}

module.exports.Questions = Questions
module.exports.Answers = Answers
module.exports.pageSchema = pageSchema
module.exports.responseSchema = responseSchema
module.exports.surveySchema = surveySchema
module.exports.getErrorMessages = getErrorMessages