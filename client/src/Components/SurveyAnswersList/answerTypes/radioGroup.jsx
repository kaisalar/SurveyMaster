import React, { Component } from "react";
import { Radio, RadioGroup} from "rsuite";
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
  };
  onChoiceChanged = value => {
    this.props.change({ value: value });
  };
  render() {
    return (
      <RadioGroup
        name="radioList"
        onChange={this.onChoiceChanged}
      >
        <Radio value="A" onChange={this.onChoiceChanged}>
          Item A
        </Radio>
        <Radio value="B" onChange={this.onChoiceChanged}>
          Item B
        </Radio>
        <Radio value="C" onChange={this.onChoiceChanged}>
          Item C
        </Radio>
        <Radio value="D" onChange={this.onChoiceChanged}>
          Item D
        </Radio>
      </RadioGroup>
    );
  }
}

export default RadioButton;
