const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('./types')

class DropDownQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_CHECKBOX
    }
}

module.exports = DropDownQuestion