import React, { Component } from 'react'
import { Radio, RadioGroup,FormGroup } from 'rsuite';
// class RadioButton extends Component {

//     state = {
//         choices: [],

//     }

//     componentDidMount() {
   
//  }
//     changedChoiceHandler = (event) => {
//         this.setState({ choices: [...this.state.choices, String(event.target.value)] }, () => this.props.change(this.state));
//     console.log(event.targe.value)
//     }
//     render() {
//         this.choicesSentences = this.props.content.choices;

//         let radios = this.choicesSentences.map((c, i) => <div className="custom-control custom-radio" key={i}>

//             <input type="radio" className="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios" onChange={this.changedChoiceHandler}/>
//             <label className="custom-control-label" for="defaultUnchecked">{c}</label>
//         </div>) 
//         return (
//             <div>

//             {radios}
//             </div>
//         )
//     }
// }
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