import React, { Component } from 'react'
import { Radio, RadioGroup } from 'rsuite';

class RadioButton extends Component{
    state = {
        choices:[],

    }
    changedChoiceHandler = (value) => {
        this.setState({ choices: [...this.state.choices,String(value)] },() =>this.props.change(this.state));
        // let Choices = Object.assign([],this.state.choices)
        // console.log(Choices)
      //  this.props.throwState(this.state)
    }

     render() {
   console.log(this.props.content)
      this.choicesSentences = this.props.content.choices;

        let radios = this.choicesSentences.map((c,i) => (<Radio key={i} value={c} onChange={this.changedChoiceHandler} >{c}</Radio>))
    
    return(<div>
            <RadioGroup name="radioList">
               {radios}
            </RadioGroup>
    </div>)
     }
    }
export default RadioButton