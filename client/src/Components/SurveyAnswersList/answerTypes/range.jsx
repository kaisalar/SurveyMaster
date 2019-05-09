
import 'rc-slider/assets/index.css';
import React from 'react';
import { Range} from 'rc-slider';
import './range.css'
class DynamicBounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minValue: 20,
            maxValue: 50,
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
            <div style={{  margin : 'auto',marginBottom:'20px'}}>
                <label className="min">Min: {this.state.minValue} </label>
                
              
                <label className="max">Max: {this.state.maxValue}</label>
               
                <Range  className='range' defaultValue={[20, 50]}  onAfterChange={this.onAfterChanged} min={this.state.min} max={this.state.max}
                    onChange={this.onSliderChange}
                />
            </div>
        );
    }
}
export default DynamicBounds