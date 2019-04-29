const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('./types')

class CheckBoxQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_CHECKBOX
    }
}

module.exports = CheckBoxQuestion