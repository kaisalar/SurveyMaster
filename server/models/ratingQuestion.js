const Question = require('./question')
const types = require('./types')

class RatingQuestion extends Question {
    constructor(props) {
        super(props)
        this.type = types.QUESTION_RATING
        this.content = {
            ratingType: props.content.ratingType || types.RATING_NUMBERS,
            min: props.content.min || 0,
            max: props.content.max || 0,
            minLabel: props.content.minLabel || 'minimum',
            maxLabel: props.content.maxLabel || 'maximum',
            defaultValue: props.content.defaultValue || 0,
        }
    }
}

module.exports = RatingQuestion