import React, { Component } from "react";
import { Radio, RadioGroup } from "rsuite";

class RadioButton extends Component {
  state = {
    value: 0
  };
  onChoiceChanged = value => {
    this.props.change({ value: value });
  };
  componentDidMount() {
    this.props.change({ value: "" });
  }

  render() {
    let max = this.props.content.max;
    let defaultValue = this.props.content.defaultValue;

    let min = this.props.content.min;
    console.log(min, max, defaultValue);

    let choices = [];
    for (let index = Number(min); index <= max; index++) {
      choices.push(
        <Radio key={index} disabled={this.props.isResponse} value={index} onChange={this.onChoiceChanged}>
          {index}
        </Radio>
      );
    }
    console.log(this.props.answer.value)
    console.log(this.props.isResponse)
    let content = this.props.isResponse ? (
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={this.props.answer.value}
        onChange={this.onChoiceChanged}
      >
        {choices}
      </RadioGroup>
    ) : (
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={Number(defaultValue)}
        onChange={this.onChoiceChanged}
      >
        {choices}
      </RadioGroup>
    );
    return (
    <React.Fragment>
        {content}
    </React.Fragment>
    );
  }
}

export default RadioButton;
