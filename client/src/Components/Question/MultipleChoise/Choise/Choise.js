import React, { Component } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import styleClass from "./Choice.module.css";

class Choise extends Component {
  state = {
    mouseHover: false
  };
  mouseHoverOn = () => {
    console.log('mousein');
    this.setState({
      mouseHover: true
    });
  };
  mouseHoverOff = () => {
    this.setState({
      mouseHover: false
    });
  };

  render() {
    let Style = null;
    if(this.state.mouseHover){
      Style = { 
        borderBottom: "1px solid #D32F2F",
        boxShadow: '0 1px 0 0 #D32F2F'
      }
    }
    return (
      <div className={styleClass.Choice}>
        <MDBInput
          label={this.props.el}
          style={Style}
          value={this.props.el}
          onKeyPress={event => this.props.keyPressedHandler(event)}
          onChange={e => this.props.changeChoiseHandler(e.target.value)}
        />
        <MDBBtn
          color="red"
          onClick={this.props.clicked}
          onMouseEnter={this.mouseHoverOn}
          onMouseLeave={this.mouseHoverOff}
        >
          Delete
        </MDBBtn>
      </div>
    );
  }
}

export default Choise;
