import React from "react";
import styleClass from "./SurveyBuilderWelcome.module.css";
import { MDBBtn } from "mdbreact";

const SurveyBuilderWelcome = props => {
  return (
    <div className={styleClass.welcomeContainer}>
      <h1>WELCOME TO SURVEY MASTER</h1>
      <h2>LET'S START ADDING QUESTION</h2>
      <p>you can choose one of many types of questions available so pick & choose what you want</p> 
      <MDBBtn onClick={props.clicked}>ADD new Question</MDBBtn> 
    </div>
  );
};

export default SurveyBuilderWelcome;
