import React, { Component } from "react";
import { connect } from "react-redux";
import { previewResponses,getFullResponse } from "../../store/actions/ResponsesActions";
import ResponesList from '../../Components/Responses/ResponsesList/ResponsesList'

class Responses extends Component {
  state = {
    dataLoaded: false
  };
  componentDidMount() {
    this.props.previewResponses(
      this.props.match.params.id,
      this.dataLoadedHandler
    );
  }

  dataLoadedHandler = newVal => {
    this.setState({
      dataLoaded: newVal
    });
  };
  render() {
    let content = null;
    if (this.state.dataLoaded)  content = <ResponesList list={this.props.data} itemClicked={(Rid) => this.props.getFullResponse(this.props.match.params.id,Rid)}/>
        return (
    <React.Fragment>
        {content}
    </React.Fragment>);
  }
}

const mapStateToProps = state => {
  return {
    data: state.responses.data
  };
};
export default connect(
  mapStateToProps,
  { previewResponses,getFullResponse }
)(Responses);
