const Element = require('../element')

class Answer extends Element {
    constructor(props) {
        super(props)
        this.questionId = props.questionId || ''
    }
}

module.exports = Answer