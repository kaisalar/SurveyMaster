class Element {
    constructor(props) {
        this._id = props._id || 0
    }

    toJson() {
        const data = JSON.stringify(this)
        return data
    }
}

module.exports = Element