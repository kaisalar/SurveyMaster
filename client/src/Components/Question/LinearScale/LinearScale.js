import React, { Component } from 'react'
import { connect } from 'redux'

class LinearScale extends Component { 
    state = { 

    }
    render() { 
        const index = this.props.index;
        const content = this.props.Qs[index].content;   
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      Qs: state.createSurvey.Questions
    };
  };

  export default connect(mapStateToProps)(LinearScale)