
import 'rc-slider/assets/index.css';
import React from 'react';
import { Range} from 'rc-slider';
import './range.css'
class DynamicBounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minValue: this.props.content.min,
            maxValue: this.props.content.max,
        };
    }
    onAfterChanged = (value) =>{
        let state = {minValue: value[0] ,maxValue: value[1]}
        this.props.change(state)
    }
    onSliderChange = (value) => {
        this.setState({minValue:value[0],maxValue:value[1]})

    }
    onMinChange = (e) => {
        this.setState({
            min: +e.target.value || 0,
        });
    }
    onMaxChange = (e) => {
        this.setState({
            max: +e.target.value || 100,
        });
    }
    render() {
        return (
            <div className="RangeContainer">
                <label className="min">{this.props.content.minLabel}<br />{this.state.minValue} </label>
                
              
                <label className="max">{this.props.content.maxLabel}<br />{this.state.maxValue}</label>
                <div>
                <Range className='range' defaultValue={[Number(this.props.content.minDefaultValue), Number(this.props.content.maxDefaultValue)]}  onAfterChange={this.onAfterChanged} min={this.state.min} max={this.state.max}
                    onChange={this.onSliderChange}
                />
                </div>
                
            </div>
        );
    }
}
export default DynamicBounds