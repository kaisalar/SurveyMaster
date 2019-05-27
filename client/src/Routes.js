import React, { Component } from "react";
import { Route, Switch,Redirect,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./Containers/HomePage/Homepage";
import Surveys from "./Containers/ShowSurveys/Surveys List/Surveys";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import SurveyFillList from "./Containers/ShowSurveys/Survey questions List/SurveyFillList";
import NavBar from "./Components/UI/NavBar/NavBar";
import SignUp from "./Components/Form/registerForm";
import SignIn from "./Components/Form/loginForm";
import Signout from "./Components/Form/logoutForm";
import "./Routes.css";
class Routes extends Component {
  render() {
    // console.log(this.props.isAuthenticated);
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <NavBar />
              <HomePage />
            </div>
          )}
        />

        <Route
          path="/signup"
          render={props => (
            <div>
              <NavBar />
              <SignUp {...props} />
            </div>
          )}
        />
        <Route
          path="/signin"
          exact
          render={props => (
            <div>
              <NavBar />
              <SignIn {...props} />
            </div>
          )}
        />
      
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated)    
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <NavBar />
                <HomePage />
              </div>
            )}
          />
          <Route path="/fill/:id" component={SurveyFillList} />
          <Route
            path="/create"
            render={(props) => {
              return (
                <div>
                  <NavBar />
                  <SurveyBuilder {...props}/>
                </div>
              );
            }}
          />
          <Route
            path="/surveys"
            render={() => (
              <div>
                <NavBar />
                <Surveys />
              </div>
            )}
          />
          <Route
            path="/signout"
            render={() => (
              <div>
                <NavBar />
                <Signout />
              </div>
            )}
          />
        </Switch>
      );
    return (<div>
      {routes}
    </div>);
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  };
};
export default withRouter(connect(mapStateToProps)(Routes));
