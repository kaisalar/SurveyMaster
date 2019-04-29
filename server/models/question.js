const Element = require('./element')

class Question extends Element {
    constructor(props) {
        super(props)
        this.title = props.title || ''
        this.description = props.description || ''
    }
}

module.exports = Question