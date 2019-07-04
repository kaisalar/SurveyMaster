import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
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
import Responses from "./Containers/Responses/Responses";
import Report from "./Containers/Report/Report";
class Routes extends Component {
  render() {
    // console.log(this.props.isAuthenticated);
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <React.Fragment>
              <NavBar transparent={true} />
              <HomePage />
            </React.Fragment>
          )}
        />

        <Route
          path="/signup"
          render={props => (
            <React.Fragment>
              <NavBar />
              <SignUp {...props} />
            </React.Fragment>
          )}
        />
        <Route
          path="/signin"
          exact
          render={props => (
            <React.Fragment>
              <NavBar />
              <SignIn {...props} />
            </React.Fragment>
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
              <React.Fragment>
                <NavBar />
                <HomePage />
              </React.Fragment>
            )}
          />
          <Route exact path="/survey/:id/report" render={(props) => (
            <Report {...props}></Report>
          )} />
          <Route exact path="/fill/:id/:lcode" render={(props) => (
            <SurveyFillList {...props} ></SurveyFillList>
          )} />
          <Route exact path="/fill/:id" render={(props) => (
            <SurveyFillList {...props} ></SurveyFillList>
          )} />

          <Route
            path="/create"
            render={(props) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <SurveyBuilder {...props} />
                </React.Fragment>
              );
            }}
          />
          <Route
            path="/surveys/:id"
            render={(props) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <Responses {...props} />
                </React.Fragment>
              );
            }}
          />
          <Route
            path="/surveys"
            render={() => (
              <React.Fragment>
                <NavBar />
                <Surveys />
              </React.Fragment>
            )}
          />
          <Route
            path="/signout"
            render={() => (
              <React.Fragment>
                <NavBar />
                <Signout />
              </React.Fragment>
            )}
          />
        </Switch>
      );
    return (<React.Fragment>
      {routes}
    </React.Fragment>);
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  };
};
export default withRouter(connect(mapStateToProps)(Routes));
