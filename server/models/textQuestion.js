const Question = require('./question')
const types = require('./types')

class TextQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_TEXT
        this.content = {
            placeHolder: props.content.placeHolder || '',
            inputType: props.content.inputType || types.INPUT_TEXT,
            min: props.content.min || 0,
            max: props.content.max || 0
        }
    }
}

module.exports = TextQuestion