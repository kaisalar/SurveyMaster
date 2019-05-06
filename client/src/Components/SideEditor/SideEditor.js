import React, { Component } from 'react'
import styleClass from './SideEditor.module.css'
import { connect } from "react-redux";

class SideEditor extends Component { 
    state = { 

    }
    render() { 
        return(
            <div className={styleClass.SideEditor}>
                <h1>Your Question ID: {this.props.Qs[this.props.index].title}</h1>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      Qs : state.createSurvey.Questions
    };
  };

export default connect(mapStateToProps)(SideEditor)