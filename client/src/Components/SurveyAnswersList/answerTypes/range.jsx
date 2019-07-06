import "rc-slider/assets/index.css";
import React from "react";
import { Range } from "rc-slider";
import "./range.css";
class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: this.props.content.min,
      maxValue: this.props.content.max
    };
  }
  onAfterChanged = value => {
    let state = { minValue: value[0], maxValue: value[1] };
    this.props.change(state);
  };
  onSliderChange = value => {
    this.setState({ minValue: value[0], maxValue: value[1] });
  };
  render() {
    return (
      <div className="RangeContainer">
        <label className="min">
          {this.props.content.minLabel}
          <br />
          {this.state.minValue}{" "}
        </label>

        <label className="max">
          {this.props.content.maxLabel}
          <br />
          {this.state.maxValue}
        </label>
        <div>
          {this.props.isResponse ? (
            <Range
              className="range"
              defaultValue={[
                Number(this.props.answer.minValue),
                Number(this.props.answer.maxValue)
              ]}
              max={Number(this.props.content.max)}
              min={Number(this.props.content.min)}
              step={Number(this.props.content.step)}
              disabled
            />
          ) : (
            <Range
              className="range"
              defaultValue={[
                Number(this.props.content.minDefaultValue),
                Number(this.props.content.maxDefaultValue)
              ]}
              onAfterChange={this.onAfterChanged}
              max={Number(this.props.content.max)}
              min={Number(this.props.content.min)}
              step={Number(this.props.content.step)}
              onChange={this.onSliderChange}
            />
          )}
        </div>
      </div>
    );
  }
}
export default DynamicBounds;
