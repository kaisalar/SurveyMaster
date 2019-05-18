import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import styles from './divider.module.css';
import { Link } from 'react-router-dom'
class SignUp extends Form {
  state = {
    data: { firstName: "", lastName: "",email:"", password: ""},
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(5)
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .min(5)
      .label("Last Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Password"),
  
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container" style={{ margin: '120px 130px' }}>
        <div className="row">
          <div className="col-md">
            <h1 className={styles.h1}>
        
              Survey Master helps you attract more responses and a higher response rate than you could with other tools
            </h1>
            <div className={styles.outer}>

              <div className={styles.inner}></div>
            </div>
          </div>
          <div className="col-md">
            <h2 className={styles.h2}>Get better data with conversational forms, surveys, quizzes & more.</h2>
            <div className={styles.formLayout}>

              <h1 style={{ marginLeft: '10px' }}>Sign up</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("firstName", "First Name")}
                {this.renderInput("lastName", "Last Name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Sign up")}
              </form>
              <label style={{ float: "right", cursor: 'default' }}>Already have an account?   <Link to="/signin">Login</Link>  </label>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default SignUp;
