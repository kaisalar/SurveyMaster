const Answer = require('./answer')
const types = require('./types')

class TextAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_TEXT
        this.content = {
            value: props.content.value || ''
        }
    }
}

module.exports = TextAnswer