import React, { Component } from 'react';
import { Checkbox } from 'rsuite';

class InputPage extends Component {
    state = {
        choices: [],
        
    }
    componentWillMount() {
        this.choicesSentences = ['choice1', 'choice2', 'choice3', 'choice4']
    }
    changedChoiceHandler = (value) => {
        this.setState({ choices: [...this.state.choices,String(value)] },() =>this.props.change(this.state));
        // let Choices = Object.assign([],this.state.choices)
        // console.log(Choices)
      //  this.props.throwState(this.state)
    }
    render() {

        let Checkboxes = this.choicesSentences.map((c, i) => <Checkbox key={i} onChange={this.changedChoiceHandler}
            value={i + 1}>{c}</Checkbox>)
        return (
            <div>
                {Checkboxes}
            </div>
        )

    }

}


export default InputPage;