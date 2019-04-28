const Answer = require('./answer')
const types = require('./types')

class RangeAnswer extends Answer {
    constructor(props) {
        super(props)
        this.type = types.ANSWER_RANGE
        this.content = {
            minValue: props.content.minValue,
            maxValue: props.content.maxValue
        }
    }
}