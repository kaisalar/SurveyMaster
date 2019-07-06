import React, { Component } from "react";
import { Checkbox } from "rsuite";
import _ from "lodash";


class InputPage extends Component {
  state = {
    choices: []
  };
  componentWillMount() {
    this.choicesSentences = this.props.content.choices;
    //  this.props.change(this.state)
  }
  changedChoiceHandler = value => {
    this.setState({ choices: this.editChoice(value) }, () => {
      this.props.change(this.state);
      console.log(this.state.choices);
    });

    // let Choices = Object.assign([],this.state.choices)
    //  this.props.throwState(this.state)
  };
  editChoice = value => {
    if (this.state.choices.includes(value)) {
      let index = this.state.choices.indexOf(value);
      let newChoices = this.state.choices;

      newChoices.splice(index, 1);
      return newChoices;
    } else return [...this.state.choices, value];
  };

  render() {
    let Checkboxes = this.choicesSentences.map((c, i) => {
      let content = this.props.isResponse ? (
        <Checkbox disabled checked={_.includes(this.props.answer.choices,c)} key={i} value={c} >
          {c}
        </Checkbox>
      ) : (
        <Checkbox key={i} onChange={this.changedChoiceHandler} value={c}>
          {c}
        </Checkbox>
      );
      return content;
    });
    return <div>{Checkboxes}</div>;
  }
}

export default InputPage;
