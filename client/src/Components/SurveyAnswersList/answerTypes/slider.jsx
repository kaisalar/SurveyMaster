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
    defaultValue: 0,
    loaded:false
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
      value: Number(min),
      loaded:true
    });
    
  }

  render() {
    let content = this.props.isResponse ?  <div className={styleClass.Silder}>
    <label className="SliderLabel">value: {this.props.answer.value}</label>
  {this.state.loaded &&  <Slider
      progress
      disabled
      max={Number(this.props.content.max)}
      min={Number(this.props.content.min)}
      defaultValue={Number(this.props.answer.value)}
    />
  }
  </div> :  <div className={styleClass.Silder}>
        <label className="SliderLabel">value: {this.state.value}</label>
      {this.state.loaded &&  <Slider
          progress
          max={this.state.max}
          min={this.state.min}
          step={this.state.step}
          defaultValue={this.state.defaultValue}
          onChange={this.onSliderChanged}
        />
      }
      </div>
    return (
     <React.Fragment>
       {content}
     </React.Fragment>
    );
  }
}

export default SliderPage;
