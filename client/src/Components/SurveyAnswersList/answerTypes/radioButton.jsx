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
        choices: [],

    }

    changedChoiceHandler = (value) => {
         this.setState({ choices: [...this.state.choices, String(value)] }, () => this.props.change(this.state));
     console.log(value)
     }
     render() {
   
      this.choicesSentences = this.props.content.choices;

         let radios = this.choicesSentences.map((c,i) => (<Radio key={i} value={c} onChange={this.changedChoiceHandler} >{c}</Radio>))
    
    return(<div>
        <FormGroup controlId="radioList">
            <RadioGroup name="radioList">
               {radios}
            </RadioGroup>
        </FormGroup>
    </div>)
     }
    }
export default RadioButton