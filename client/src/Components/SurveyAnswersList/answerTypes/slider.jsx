import React, { Component } from "react";
import styleClass from "./Slider.module.css";
import "./slider.css";
import { Slider } from "rsuite";
// const styles = {

//     slider: {
//         padding: '22px 0px',
//         margin: '50px auto',
//         width:'60%'
//     },
// };

// class SimpleSlider extends React.Component {
//     state = {
//         value: 5,
//         min:0,
//         max:10
//     };

//     handleChange = (value) => {
//         this.setState({ value : value });
//     this.props.change({value:value})

//     };

//     componentDidMount() {
//         console.log("....", this.props.content)
//         this.setState({ max: this.props.content.max,min:this.props.content.min })

//     }

//     render() {
//         console.log(this.props.content)
//          return (
//             // <div >
//             //     <Typography id="label">{this.state.value}</Typography>
//             //     <Slider
//             //     step={1}
//             //         classes={{ container: classes.slider }}
//             //         value={value}
//             //         aria-labelledby="label"
//             //         onChange={this.handleChange}
//             //         onChangeCapture={(event) => this.props.change(event)}
//             //     />
//             // </div>
//              <Slider progress  max={this.props.content.max}  step={this.props.content.step} className="slider" onChange = {this.handleChange} style={{styles}}/>

//         );
//     }
// }
// import React from "react";

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
