import React from "react";
import ResponseItem from "./ResponseItem/ResponseItem";
import "./ResponsesList.css";

const ResponseList = props => {
  let Content = null;
  if (props.list) {
    Content = props.list.map((el, i) => (
      <ResponseItem
        date={el.date}
        id={el._id}
        key={i}
        clicked={() => props.itemClicked(el._id)}
      />
    ));
  }
  return (
    <div className="responses-list">
      <h2>Responses List</h2>
      <div className="list">{Content}</div>
    </div>
  );
};

export default ResponseList;
