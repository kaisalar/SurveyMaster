import React, { Component } from 'react'
import { Radio, RadioGroup } from 'rsuite';


class RadioButton extends Component {

    state = {
        value: 0
    }
    onChoiceChanged = (value) => {
        this.props.change({value:value})
    }
   
    
    render() {
        let max = this.props.content.max
        let defaultValue = this.props.content.defaultValue

        let min = this.props.content.min
        console.log(min,max,defaultValue)
    
        let choices =[];
         for (let index = Number(min); index <= max; index++) {
            
             choices.push(<Radio key={index} value={index }   onChange={this.onChoiceChanged}>{index }</Radio>)
        }
        return (
                <RadioGroup name="radioList" inline appearance="picker" defaultValue={Number(defaultValue)} onChange={this.onChoiceChanged}>
                   {choices}
                </RadioGroup>
            )
    }
}

export default RadioButton;
