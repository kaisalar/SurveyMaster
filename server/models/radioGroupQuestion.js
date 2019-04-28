const MultipleChoiceQuestion = require('./multipleChoiceQuestion')
const types = require('./types')

class RadioGroupQuestion extends MultipleChoiceQuestion {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_RADIO_GROUP
    }
}

module.exports = RadioGroupQuestion