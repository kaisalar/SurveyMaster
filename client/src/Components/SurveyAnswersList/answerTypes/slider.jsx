import React, { Component } from "react";
import styleClass from "./Slider.module.css";
import "./slider.css";
import { Slider } from "rsuite";

class SliderPage extends Component {
  state = {
    value: 2,
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 0
  };
  onSliderChanged = e => {
    this.setState({ value: e });
    let value = { value: e };
    this.props.change(value);
  };
  componentDidMount() {
    const { min, max, step, defaultValue } = this.props.content;
    this.setState({
      min: Number(min),
      max: max,
      step: step,
      defaultValue: Number(defaultValue),
      value: Number(min)
    });
  }

  render() {
    return (
      <div className={styleClass.Silder}>
        <label className="SliderLabel">value: {this.state.value}</label>
        <Slider
          progress
          max={this.state.max}
          min={this.state.min}
          step={this.state.step}
          defaultValue={this.state.defaultValue}
          onChange={this.onSliderChanged}
        />
      </div>
    );
  }
}

export default SliderPage;
