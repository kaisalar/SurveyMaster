import ReactStars from 'react-stars'
import React from 'react'

class Rater extends React.Component {
    constructor(props) {
        super(props)
        this.value = 0;
    }
    ratingChanged = (newRating) => {
        this.props.change(newRating)
        this.value = newRating;
    }

    render() {
        return (


            <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={24}
                value={this.value}
                color2={'#ffd700'}
            />

        );
    }
}
export default Rater