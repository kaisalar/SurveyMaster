import React from "react";
import ResponseItem from "./ResponseItem/ResponseItem";
import "./ResponsesList.css";

class ResponseList extends React.Component {
  state = {
    focusedIndex: -1
  };

  itemClicked = (id,focusedIndex) => { 
    this.setState({focusedIndex: focusedIndex})
    this.props.ListItemClicked(id)
  }

  render() {
    let Content = null;
    if (this.props.list) {
      Content = this.props.list.map((el, i) => (
        <ResponseItem
          date={el.date}
          id={el._id}
          key={i}
          clicked={() => this.itemClicked(el._id,i)}
          focused={i === this.state.focusedIndex}
        />
      ));
    }
    return (
      <div className="responses-list">
        <h2>Responses List</h2>
        <div className="list">{Content}</div>
      </div>
    );
  }
}

export default ResponseList;
