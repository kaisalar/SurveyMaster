import React, { Component } from 'react'
import { Slider } from 'rsuite';
class CustomSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }
    onRangeChanged = (value) => {
        this.setState({value: value} , () => this.props.change(value))
    }
    render() {
        const labels = [0,1,2,3,4,5,6,7,8,9,10];
        const { value } = this.state;
        const handleStyle = {
            color: '#000',
            fontSize: 12,
            width: '70%',
            height: 32,
            margin:'30px auto',
            //verticalAlign:'middle'
            
        };

        return (
            <div>
                <p style={{float:'left' ,margin: 'auto'}}>min value: {labels[0]}</p>
                <p style={{ float: 'right' , margin:'auto' }}>max value:{labels.length - 1}</p>
                <Slider defaultValue={  50} min={10} step={10} max={100} 
                graduated
                 progress 
                style={handleStyle}
                onChange={this.onRangeChanged}/>
              
            </div>
        );
    }
}
export default CustomSlider;