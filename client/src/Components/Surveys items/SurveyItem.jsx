import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { Alert } from "rsuite";
import Close from "../UI/Close/Close";
import SurveyFillList from "../../Containers/ShowSurveys/Survey questions List/SurveyFillList";
import "./SurveyItem.css";
import * as moment from "moment";
import Responses from "../../Containers/Responses/Responses";
/* single item for View all Surveys List in surveys.jsx*/

class CardExample extends Component {
  constructor(props) {
    super(props);

    this.URL = "/fill/" + this.props.id;
    this.B_URL = "http://localhost:3000";
    this.SERVER_URL = "http://localhost:5000";
    this.images = ["elliot", "images", "jenny", "kristy", "matthew"];
  }
  state = {
    hovered: false
  };

  hoverHandler = newVal => {
    this.setState({ hovered: newVal });
  };
  getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return String(color);
  };
  getRandomImage = () => {
    let random = Math.floor(Math.random() * 5);
    return this.images[random];
  };
  onShareClick = () => {
    Alert.success(
      "Link is copied to clipboard... opening for sharing....",
      3000
    );
    window.setTimeout(
      () => window.open(this.B_URL + this.URL, SurveyFillList),
      2000
    );
  };
  exportHandler = () => {
    window.open(this.SERVER_URL + "/api/surveys/" + this.props.id + "/responses.xlsx")
  }

  onResponseClick = () => {
    Alert.success("Link is coding....", 3000);
    window.setTimeout(
      () => window.open(this.B_URL + "/surveys/" + this.props.id, Responses),
      2000
    );
  };

  render() {
    const { description, title, date } = this.props;
    const cardClass = this.state.hovered ? "card close-hover" : "card"
    return (
      <React.Fragment>
        <div style={{ margin: "10px 10px 10px 45px" }}>
          <Card
            className={cardClass}
            fluid
            style={{
              // borderBottom: "4px solid" + this.getRandomColor(),
              minWidth: "300px",
              maxWidth: "300px",
              minHeight: "200px"
            }}
          >
            <Close clicked={this.props.click} hoverIn={() => this.hoverHandler(true)} hoverOut={() => this.hoverHandler(false)} />
            <Card.Content>
              {/* <Image floated='right' size='mini' onClick={this.props.click}><i className="fas fa-times"></i></Image> */}
              <Card.Header>{title}</Card.Header>
              <Card.Meta>Date: {moment(date).format("DD-MM-YYYY")}</Card.Meta>
              <Card.Description style={{ fontSize: "1.25rem" }}>
                {description
                  ? description
                  : "testing surveys on Survey Master to give you a new Survey"}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <CopyToClipboard text={this.B_URL + this.URL}>
                  <Button
                    basic
                    color="blue"
                    onClick={this.onShareClick}
                  >
                    Share <i className="fas fa-paper-plane" />
                  </Button>
                </CopyToClipboard>
                <Link to={"/surveys/" + this.props.id}>
                  <Button
                    basic
                    color="violet">
                    responses <i className="fas fa-paperclip" />
                  </Button>
                </Link>
                  <Button
                    basic
                    onClick={this.exportHandler}
                    color="green"
                  >
                    export <i className="fas fa-file-excel"></i>
                  </Button>
                  <Link to={"/surveys/" + this.props.id + '/report'}>
                  <Button
                    basic
                    color="teal">
                    Reports <i className="fas fa-chart-pie"></i>
                  </Button>
                </Link>
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
    );
  }
}
export default CardExample;
