import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MDBAlert, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, Button } from 'mdbreact';

class CardExample extends Component {
  constructor(props) {
    super(props);
   
    this.URL = "/filling/" + this.props.id;
    this.B_URL = "http://localhost:7929";
  }

  render() {
    return (
      <React.Fragment>
        <MDBCol>
          <MDBCard style={{ width: "22rem", margin: '20px auto' }}>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <h4>ID : {this.props.id}</h4>
              <MDBCardTitle>title: {this.props.title}</MDBCardTitle>
              <MDBCardText>
                Date:  {this.props.date}
              </MDBCardText>
              <Link to={this.URL}>
                <Button style={{ color: 'white' }} onClick={this.showSurviyOnClick}>
                  Preview
               </Button>
              </Link>
              <Button onClick={this.props.click} style={{ color: 'red' }}>Delete</Button>
              {/* <CopyToClipboard text={this.B_URL + this.URL} */}
               /**on copy */>
                <Button style={{ color: 'white' }} > Get Link
                </Button>
              {/* </CopyToClipboard> */}
              <MDBAlert color="success" >
                A simple success alert—check it out!
      </MDBAlert>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </React.Fragment>
    )
  }

}

export default CardExample;