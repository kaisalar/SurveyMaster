import React, { Component } from 'react';
import { Radio, RadioGroup } from 'rsuite';

class RadioButton extends Component {
    state = {
        value: 0,
    };
    onChoiceChanged = value => {
        this.props.change({ value: value });
    };
    componentDidMount() {
        this.props.change({ value: 1e9 });
    }

    render() {
        let max = this.props.content.max;
        let defaultValue = this.props.content.defaultValue;

        let min = this.props.content.min;
        console.log(min, max, defaultValue);

        let choices = [];
        for (let index = Number(min); index <= max; index++) {
            choices.push(
                <Radio
                    key={index}
                    value={index}
                    onChange={this.onChoiceChanged}
                >
                    {index}
                </Radio>
            );
        }
     let content = this.props.isResponse ? (
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        defaultValue={this.props.answer.value}
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
