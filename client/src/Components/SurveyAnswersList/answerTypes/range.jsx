
import 'rc-slider/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range} from 'rc-slider';

class DynamicBounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minValue: 0,
            maxValue: 100,
        };
    }
    onAfterChanged = (value) =>{
        let state = {minValue: value[0] ,maxValue: value[1]}
        this.props.change(state)
    }
    onSliderChange = (value) => {
        console.log(value)

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
            <div style={{width:"70%" , margin : 'auto',marginBottom:'20px'}}>
                <label>Min: </label>
                <input type="number" value={this.state.minValue} disabled onChange={this.onMinChange} />
                <br />
                <label>Max: </label>
                <input type="number" value={this.state.maxValue} disabled onChange={this.onMaxChange} />
                <br /><br />
                <Range style={{border:'blue'}} defaultValue={[20, 50]}  onAfterChange={this.onAfterChanged} min={this.state.min} max={this.state.max}
                    onChange={this.onSliderChange}
                />
            </div>
        );
    }
}
export default DynamicBounds