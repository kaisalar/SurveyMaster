import React, { Component } from 'react';
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
    state={
        value: 0,
        min:0,
        max:10
    }
    onSliderChanged =(e) =>{
        this.setState({value:e.target.value})
    }
    render(){
        
        const {min,max,step} = this.props.content;
        return (
            <div className="my-5" style={{width: '70%' , margin:'auto'}}>
            <label htmlFor="customRange1">value: {this.state.value}</label>
            <input type="range" min={min} max={max} step={step} className="custom-range" onChange={this.onSliderChanged} id="customRange1" />
        </div>
    );
}
}

export default SliderPage;
