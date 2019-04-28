const uuidv4 = require('uuid/v4')

class Element {
    constructor(props) {
        this._id = props._id || uuidv4()
    }

    toJson() {
        const data = JSON.stringify(this)
        return data
    }
}

module.exports = Element