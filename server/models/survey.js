const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Page = require('./page')
const Response = require('./response')
const { surveySchema } = require('./validationSchemas')

class Survey extends Element {
    constructor(props) {
        super(props)
        this.title = props.title || ''
        this.description = props.description || ''
        this.date = props.date || Date.now()
        this.link = props.link || ''
        this.pages = []
        if (props.pages && _.isArray(props.pages)) {
            props.pages.forEach(p => {
                this.addPage(p)
            });
        }
        this.responses = []
        if (props.responses && _.isArray(props.responses)) {
            props.responses.forEach(r => {
                this.addResponse(response)
            })
        }
    }

    addPage(page) {
        if (!page instanceof Page) {
            page = new Page(page)
        }
        this.pages.push(response)
    }

    addResponse(response) {
        if (!response instanceof Response) {
            response = new Response(response)
        }
        this.responses.push(response)
    }

    static validate(survey) {
        const result = Joi.validate(survey, surveySchema)
        return result
    }
}

module.exports = Survey