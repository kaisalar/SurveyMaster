import React, { Component } from "react";
import { connect } from "react-redux";
import { previewResponses,getFullResponse } from "../../store/actions/ResponsesActions";
import ResponesList from '../../Components/Responses/ResponsesList/ResponsesList'
import Response from '../../Components/Responses/Response/Response'
import { MDBRow, MDBCol } from "mdbreact";
import './Responses.css'

class Responses extends Component {
  state = {
    dataLoaded: false,
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

  focusedIndexHandler = newVal => { 
    this.setState({
      focusedIndex: newVal
    })
  }
  render() {
    let ResponsesList = null;
    let data = this.props.response ? this.props.response.answers : null;
    if (this.state.dataLoaded)  ResponsesList = <ResponesList list={this.props.data} ListItemClicked={(Rid) => this.props.getFullResponse(this.props.match.params.id,Rid)}/>
        return (
    <div className="responses">
      <MDBRow>
        <MDBCol size="4">
        {ResponsesList}
        </MDBCol>
        <MDBCol>
          <Response data={data}></Response>
        </MDBCol>
      </MDBRow>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    data: state.responses.data,
    response: state.responses.response
  };
};
export default connect(
  mapStateToProps,
  { previewResponses,getFullResponse }
)(Responses);
