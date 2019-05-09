import React from 'react';
//import Slider from '@material-ui/lab/Slider';
import './slider.css'
import { Slider } from 'rsuite';
const styles = {
  
    slider: {
        padding: '22px 0px',
        margin: '50px auto',
        width:'60%'
    },
};

class SimpleSlider extends React.Component {
    state = {
        value: 5,
        min:0,
        max:10
    };

    handleChange = (value) => {
        this.setState({ value });
    this.props.change({value:value})

    };
   
    componentDidMount() {
        console.log("....", this.props.content.max)
        this.setState({ max: this.props.content.max,min:this.props.content.min })
      
    }
    


    render() {
         return (
            // <div >
            //     <Typography id="label">{this.state.value}</Typography>
            //     <Slider
            //     step={1}
            //         classes={{ container: classes.slider }}
            //         value={value}
            //         aria-labelledby="label"
            //         onChange={this.handleChange}
            //         onChangeCapture={(event) => this.props.change(event)}
            //     />
            // </div>
            <Slider progress  max={this.state.max}  step={this.props.content.step} defaultValue={50} className="slider" onChange = {this.handleChange} style={{styles}}/>

        );
    }
}


export default (SimpleSlider);