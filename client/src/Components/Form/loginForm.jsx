import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { Link } from 'react-router-dom'
import styles from './divider.module.css'
class SignIn extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>

      <div className="container" style={{ margin: '120px 130px' }}>
        <div className="row">
          <div className="col-md">
            <h1 className={styles.h1} >
                 Survey Master helps you attract more responses and a higher response rate than you could with other tools
            </h1>
            <div className={styles.outer}>

              <div className={styles.inner}></div>
            </div>
          </div>
          <div className="col-md">
            <h1 className={styles.h2}>Hello, who’s this?</h1>
            <div className={styles.formLayout}>
              <form onSubmit={this.handleSubmit}>
                <h1 style={{marginLeft:'10px'}}>Sign In</h1>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
              <label style={{ float: "right", cursor: 'default' }}>Don't have an account?   <Link to="/signup">Sign Up</Link>  </label>
            </div>
          </div>
        </div>
      </div>
      <div>
          <h2 className={styles.h3}>Ready for your treat? Sign in to get it </h2 >
      </div>
      </React.Fragment>

    );
  }
}

export default SignIn;
