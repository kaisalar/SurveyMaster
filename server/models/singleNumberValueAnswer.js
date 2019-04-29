const Answer = require('./answer')
const types = require('./types')

class SingleNumberValueAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_SINGLE_NUMBER_VALUE
        this.content = {
            value: props.content.value || 0
        }
    }
}

module.exports = SingleNumberValueAnswer