import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Choice.module.css";
import { IconButton, Icon } from "rsuite";

class Choise extends Component {
  state = {
    mouseHover: false
  };
  mouseHoverOn = () => {
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
    if (this.state.mouseHover) {
      Style = {
        borderBottom: "1px solid #D32F2F",
        boxShadow: "0 1px 0 0 #D32F2F"
      };
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
        <IconButton
          icon={<Icon icon="close"/>}
          color="red"
          circle
          size="sm"
          onClick={this.props.clicked}
          onMouseEnter={this.mouseHoverOn}
          onMouseLeave={this.mouseHoverOff}
        />
      </div>
    );
  }
}

export default Choise;
