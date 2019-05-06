import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MDBAlert, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, Button } from 'mdbreact';

/* single item for View all Surveys List in surveys.jsx*/

class CardExample extends Component {
  constructor(props) {
    super(props);

    this.URL = "/fill/" + this.props.id;
    this.B_URL = "http://localhost:3000";
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
                <Button style={{ color: 'white' }} >
                  Preview
               </Button>
              </Link>
              <Button onClick={this.props.click} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
              {/* <CopyToClipboard text={this.B_URL + this.URL} */}
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