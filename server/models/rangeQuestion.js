const Question = require('./question')
const types = require('./types')

class RangeQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_RANGE
        this.content = {
            min: props.content.min || 0,
            max: props.content.max || 0,
            minLabel: props.content.minLabel || 'minimum',
            maxLabel: props.content.maxLabel || 'maximum',
            minDefaultValue: props.content.minDefaultValue || min,
            maxDefaultValue: props.content.maxDefaultValue || max,
            step: props.content.step || -1 // if -1 -> there is no step
        }
    }
}

module.exports = RangeQuestion