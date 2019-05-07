const Question = require('./question')

class MultipleChoiceQuestion extends Question {
    constructor(props) {
        super(props)
        this.content = {
            choices: props.content.choices || []
        }
    }
}

module.exports = MultipleChoiceQuestion