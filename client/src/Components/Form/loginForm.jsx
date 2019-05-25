import React from "react";
import Joi from "joi-browser";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { authSignIn } from '../../store/actions/authAction'
import {Alert} from 'rsuite'
import { currentUser } from '../../store/actions/viewAction'
import Form from "./form";
import styles from './divider.module.css'
import { decodeUser } from "../../store/actions/jwtDecode";
class SignIn extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    token: ""
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  static getDerivedStateFromProps(props, state) {
    state.token = props.token
    return state
  }
  doSubmit = async () => {
    const { email, password } = this.state.data
    await this.props.authSignIn(email, password)
    const user = decodeUser();
    console.log(user)
    this.props.currentUser(user)
  //   if(this.props.error){
  //     Alert.error(this.props.error)
  //   }
  //  else
    this.props.history.push('/surveys')
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
                  <h1 style={{ marginLeft: '10px' }}>Sign In</h1>
                  {this.renderInput("email", "Email")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Sign in")}
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
const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error
})

export default connect(mapStateToProps, { authSignIn, currentUser })(SignIn);
