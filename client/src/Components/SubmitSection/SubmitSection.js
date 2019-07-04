import React from "react";
import styleClass from "./SubmitSection.module.css";

const SubmitSection = props => {
  return (
    <div className="section">
      <div className={styleClass.SubmitContainer}>
        <h2>We Are Almost Done</h2>
        <h4>Just Click The Button To Submit Your Respone</h4>
        <button className={styleClass.btn + " btn"} onClick={props.ckicked}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default SubmitSection;
