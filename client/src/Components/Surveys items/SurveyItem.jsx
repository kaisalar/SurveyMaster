import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Notification,Paragraph } from 'rsuite';
 import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MDBAlert, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,Button } from 'mdbreact';
import SurveyFillList from '../../Containers/ShowSurveys/Survey questions List/SurveyFillList';

/* single item for View all Surveys List in surveys.jsx*/

class CardExample extends Component {
  constructor(props) {
    super(props);

    this.URL = "/fill/" + this.props.id;
    this.B_URL = "http://localhost:3000";
  }
   open = (funcName) => {
  Notification[funcName]({
    title: funcName,
    description: <Paragraph style={{ width: 320 }} rows={3} />
  });
     this.props.click();
}

  render() {

    return (
      <React.Fragment>
        <MDBCol>
          <MDBCard style={{ width: "22rem", margin: '20px auto' }}>
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
              <CopyToClipboard text={this.B_URL + this.URL}>
               <a onClick = {() => window.open(this.B_URL+this.URL , SurveyFillList)}>
                <Button onClick={() => {this.open('success')}} style={{ color: 'white' }} > Get Link
                </Button>
              </a>
              </CopyToClipboard>
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