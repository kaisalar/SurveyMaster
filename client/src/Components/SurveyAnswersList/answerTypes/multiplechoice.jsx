import React, { Component } from 'react';
import { MDBInput, MDBFormInline } from 'mdbreact';
import { Checkbox, CheckboxGroup } from 'rsuite';

class InputPage extends Component {
    state = {
        choices: [],
    
    }
    componentWillMount() {
        this.choicesSentences = ['choice1', 'choice2', 'choice3', 'choice4']
    }
    changedChoiceHandler = (value) => {
        this.setState({ choices: [...this.state.choices,value] },() =>this.props.change(this.state.choices));
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