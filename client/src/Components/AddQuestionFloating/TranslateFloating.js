import React from "react";
import languages from "./languages";
import "./AddQuestionFloating.css";
import {
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdown
} from "mdbreact";

const TranslateFloating = props => {
  let items = languages.map((el, i, arr) => {
    return (
      <MDBDropdownItem
        key={i}
        onClick={() => {
          props.chooseLanguage(el.code);
        }}
      >
        {el.name}
      </MDBDropdownItem>
    );
  });
  return (
    <div className="floating-select-picker">
      <MDBDropdown>
        <MDBDropdownToggle>
          Translate 
          {/* <MDBIcon icon="plus" /> */}
        </MDBDropdownToggle>
        <MDBDropdownMenu>{items}</MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};
export default TranslateFloating;
