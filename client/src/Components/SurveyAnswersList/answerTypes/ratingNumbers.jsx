import React, { Component } from 'react'
import { Radio, RadioGroup, FormGroup } from 'rsuite';
// const styles = {
//     radioGroupLabel: {
//         padding: '8px 12px',
//         display: 'inline-block',
//         verticalAlign: 'middle'
//     }
// };

class RadioButton extends Component {

    state = {
        value: 0
    }
    onChoiceChanged = (value) => {
        this.props.change({value:value})
    }
   
    
    render() {
        let max = this.props.content.max
        let choices =[];
         for (let index = 0; index < max; index++) {
            
             choices.push(<Radio key={index} value={index + 1} onChange={this.onChoiceChanged}>{index +1 }</Radio>)
        }
        return (
            <FormGroup controlId="radioList">
                <RadioGroup name="radioList" inline appearance="picker" defaultValue={choices.length} onChange={this.onChoiceChanged}>
                   {choices}
                  
 
                </RadioGroup>
            </FormGroup>)
    }
}

export default RadioButton;
