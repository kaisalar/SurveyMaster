import React, { Component } from 'react';
import { Checkbox } from 'rsuite';

class InputPage extends Component {
    state = {
        choices:[],
   
    }
    componentWillMount() {
        this.choicesSentences = this.props.content.choices;
    }
    changedChoiceHandler = (value) => {
        this.setState({ choices: this.editChoice(value)},
        () => {
            if(this.state.choices.length > 0)
            this.props.change(this.state)
            console.log(this.state.choices)
        }
            );
       
        // let Choices = Object.assign([],this.state.choices)
      //  this.props.throwState(this.state)
    }
    editChoice = (value) => { 
       
        if(this.state.choices.includes(value))
        {
            let index =this.state.choices.indexOf(value)   
            let newChoices = this.state.choices
          
          newChoices.splice(index , 1)
            console.log(newChoices, index)
            return  newChoices
        }
        else return [...this.state.choices,value]
    }

    render() {
       
        let Checkboxes = this.choicesSentences.map((c, i) => <Checkbox key={i} onChange={this.changedChoiceHandler}
            value={c}>{c}</Checkbox>)
        return (
            <div>
                {Checkboxes}
            </div>
        )

    }

}


export default InputPage;