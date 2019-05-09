import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MDBAlert, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import SurveyFillList from '../../Containers/ShowSurveys/Survey questions List/SurveyFillList';
import './SurveyItem.css'
/* single item for View all Surveys List in surveys.jsx*/

class CardExample extends Component {
  constructor(props) {
    super(props);

    this.URL = "/fill/" + this.props.id;
    this.B_URL = "http://localhost:3000";
  }
  


  render() {
    const {id , description , title , date} = this.props
    return (
      <React.Fragment>
        <div style={{margin:'10px'}}>

        <Card className ='card' >
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <Card.Header>{title}</Card.Header>
            <Card.Meta>ID: {id}</Card.Meta>
            <Card.Meta>Date: {date}</Card.Meta>
            <Card.Description>
              {description} 
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <CopyToClipboard text={this.B_URL + this.URL}>
                <a onClick={() => window.open(this.B_URL + this.URL, SurveyFillList)}>
                  
                  <Button basic color='green'  style={{ color: 'white' }} > 
                      Share <i class="fas fa-paper-plane"></i>
                </Button>
                </a>
              </CopyToClipboard>
              <div style={{width:'40px' , marginLeft:'3px'}}>

              <Button color='red' onClick={this.props.click} style={{ backgroundColor: 'red', color: 'white' }}>
                    <i class="fas fa-backspace"></i>
              </Button>
              </div>
            
            </div>
          </Card.Content>
        </Card>
        </div>
        
              {/* <Link to={this.URL}>
                <Button style={{ color: 'white' }} >
                  Preview
               </Button>
              </Link> */}
           

      </React.Fragment>
    )
            

}
}
export default CardExample;