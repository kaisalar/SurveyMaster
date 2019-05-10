import React, { Component } from 'react';
import { Button, Card, Image, CardGroup } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'rsuite';
import SurveyFillList from '../../Containers/ShowSurveys/Survey questions List/SurveyFillList';
import './SurveyItem.css'
import images from '../../assets/characters/elliot.png'
/* single item for View all Surveys List in surveys.jsx*/

class CardExample extends Component {
  constructor(props) {
    super(props);

    this.URL = "/fill/" + this.props.id;
    this.B_URL = "http://localhost:3000";
    this.images=[
      "elliot",
       "images",
       "jenny",
       "kristy",
       "matthew"
    ]
  }


 getRandomColor = ()=> {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return String(color);
}
 getRandomImage = () =>{
  let random = Math.floor(Math.random()*5);
  return this.images[random]
 }
 onShareClick = () => {
   Alert.success("Link is copied to clipboard... opening for sharing....", 3000);
   window.setTimeout(() => window.open(this.B_URL + this.URL, SurveyFillList), 2000)
 }

  render() {
        const { id, description, title, date } = this.props
    return (
      <React.Fragment>
        <div style={{ margin:"10px 10px 10px 25px" }}>
            <Card className='card' fluid style={{ borderBottom: '4px solid'+this.getRandomColor()}}>
            <Card.Content>
              <Image floated='right' size='mini' src={images}/>
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

                  <Button basic color='green' style={{ color: 'white' }} onClick={this.onShareClick}>
                    Share <i className="fas fa-paper-plane"></i>
                  </Button>
                </CopyToClipboard>
                <div style={{ width: '40px', marginLeft: '3px' }}>

                  <Button color='red' onClick={this.props.click} style={{ backgroundColor: 'red', color: 'white' }}>
                    <i className="fas fa-backspace"></i>
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