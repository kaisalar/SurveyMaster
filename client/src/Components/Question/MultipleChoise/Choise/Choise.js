import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styleClass from "./Choice.module.css";
import { IconButton, Icon } from "rsuite";
import * as Qtypes from "../../QuestionTypes"

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
    let IconType = "";
    switch (this.props.type) { 
      case Qtypes.CHECKBOX: 
      IconType = "square-o"
      break;
      case Qtypes.RADIO_GROUP: 
      IconType = "circle-o"
      break;
      case Qtypes.DROPDOWN: 
      IconType = "angle-down"
      break;
      default:
      IconType = "square-o"
    }
    return (
      <div className={styleClass.Choice}>
        <Icon icon={IconType} size="2x" />
        <MDBInput
          label={this.props.el}
          style={Style}
          value={this.props.el}
          onKeyPress={event => this.props.keyPressedHandler(event)}
          onChange={e => this.props.changeChoiseHandler(e.target.value)}
        />
        <IconButton
          icon={<Icon icon="close" />}
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
