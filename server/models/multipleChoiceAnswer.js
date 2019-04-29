const Answer = require('./answer')
const types = require('./types')

class MultipleChoiceAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_MULTIPLE_CHOICE
        this.content = {
            choices: props.content.choices || []
        }
    }
}

module.exports = MultipleChoiceAnswer