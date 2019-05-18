import React, { Component } from 'react'
import { Radio, RadioGroup,FormGroup } from 'rsuite';

class RadioButton extends Component{
    state = {
        value:0,

    }

    changedChoiceHandler = (value) => {
        console.log(value)
         this.setState({ value: value }, () => this.props.change(this.state));
     }
     render() {
   
      this.choicesSentences = this.props.content.choices;

        let radios = this.choicesSentences.map((c,i) => (<Radio key={i} value={i + 1} onChange={this.changedChoiceHandler} >{c}</Radio>))
    
    return(<div>
            <RadioGroup name="radioList">
               {radios}
            </RadioGroup>
    </div>)
     }
    }
export default RadioButton