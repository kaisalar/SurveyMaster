import React, { Component } from "react";
import { Radio, RadioGroup } from "rsuite";
import _ from "lodash";

class RadioButton extends Component {
  state = {
    choices: []
  };
  changedChoiceHandler = value => {
    this.setState({ choices: [...this.state.choices, String(value)] }, () =>
      this.props.change(this.state)
    );
    // let Choices = Object.assign([],this.state.choices)
    // console.log(Choices)
    //  this.props.throwState(this.state)
  };
  componentDidMount() {
    this.props.change(this.state);
  }

  render() {
    this.choicesSentences = this.props.content.choices;
    let radios = this.choicesSentences.map((c, i) => {
      let content = this.props.isResponse ? (
        <Radio key={i} value={c} disabled>
          {c}
        </Radio>
      ) : (
        <Radio key={i} value={c} onChange={this.changedChoiceHandler}>
          {c}
        </Radio>
      );
      return content;
    });
    let radioGroup = this.props.isResponse ? (
      <RadioGroup name="radioList" value={this.props.answer.choices[0]}>
        {radios}
      </RadioGroup>
    ) : (
      <RadioGroup name="radioList">{radios}</RadioGroup>
    );  
    return <React.Fragment>{radioGroup}</React.Fragment>;
  }
}
export default RadioButton;
