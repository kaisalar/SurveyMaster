import React from "react";
import ResponseItem from "./ResponseItem/ResponseItem";

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
  return <React.Fragment>{Content}</React.Fragment>;
};

export default ResponseList;
