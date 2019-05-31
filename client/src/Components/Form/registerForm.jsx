import React from "react";
import Joi from "joi-browser";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { authSignUp } from '../../store/actions/authAction'
import { currentUser } from '../../store/actions/viewAction'
import { decodeUser } from "../../store/actions/jwtDecode";
import { Alert } from 'rsuite'
import Form from "./form";
import Loader from "../UI/Loader/Loader";
import styles from './divider.module.css';
class SignUp extends Form {
  state = {
    data: { firstName: "", lastName: "", email: "", password: "" },
    errors: {},
    token: {},
    SignUperror: this.props.error,
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(3)
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .min(3)
      .label("Last Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .label("Password"),

  };

  doSubmit = async () => {
    this.setState({ SignUperror: this.props.error, token: this.props.token })
    const { firstName, lastName, email, password } = this.state.data
    await this.props.authSignUp(firstName, lastName, email, password)
    const user = decodeUser();
    this.props.currentUser(user)
    if (this.props.loading) {
      this.props.history.push('/surveys');
    }
    if (this.props.error)
      Alert.warning(
        "The user is already exist,Login or register a new one",
        3000
      );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loading ?
          < Loader />
          : null}
        <div className="container" style={{marginTop: '50px' }}>
          <div className="row">
            <div className="col-md">
              <h1 className={styles.h1}>

                Survey Master offers a tremendous set of tools for designing your survey, sharing your survey online, and reviewing your survey results.
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
      </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.auth.loading
})
export default withRouter(connect(mapStateToProps, { authSignUp, currentUser })(SignUp));
