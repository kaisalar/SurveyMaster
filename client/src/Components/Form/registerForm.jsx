import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Layout from "../Layout/Layout";

class SignUp extends Form {
  state = {
    data: { firstName: "",lastName:"", password: "", name: "" },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("First Name"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <Layout className="formLayout">

        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Sign up")}
        </form>
        </Layout>
      </div>
    );
  }
}

export default SignUp;
