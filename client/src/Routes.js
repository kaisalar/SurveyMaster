import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/Homepage";
 import Surveys from "./Containers/ShowSurveys/Surveys List/Surveys";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import SurveyFillList from './Containers/ShowSurveys/Survey questions List/SurveyFillList'
// import asyncComponent from "./hoc/asyncComponent";
import "./Routes.css";
import NavBar from "./Components/UI/NavBar/NavBar";
import SignUp from "./Components/Form/registerForm";
import SignIn from "./Components/Form/loginForm";
// const TransitionPages = props => {
//   return (
//     <CSSTransition
//       {...props}
//       //  classNames="fadeTranslate"
//       timeout={800}
//       mountOnEnter={true}
//       unmountOnExit={true}
//     />
//   );
//};

// const SurveyBuilder = asyncComponent(() => {
//   return import("./Containers/SurveyBuilder/SurveyBuilder");
// });
// const SurveyFillList = asyncComponent(() => {
//   return import(
//     "./Containers/ShowSurveys/Survey questions List/SurveyFillList"
//   );
// });
// const Surveys = asyncComponent(() => {
//   return import("./Containers/ShowSurveys/Surveys List/Surveys");
// });
class Routes extends Component {
  constructor(props){
    super(props);
    this.viewNavBar = true
  }
  state = {
  };
  render() {
    return (
      <Route
        render={() => (
          <Switch>
            <Route path="/" exact render={()=>(
              <div>
                <NavBar/>
                <HomePage/>
              </div>
            )} />

            <Route path="/fill/:id" component={SurveyFillList} />
            <Route
              path="/create"
              render={() => {
                return (
                  <div>
                    <NavBar />
                    <SurveyBuilder />
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
              path="/signup"
              render={() => (
                <div>
                  <NavBar />
                  <SignUp />
                </div>
              )}
            />
            <Route
              path="/signIn"
              render={() => (
                <div>
                  <NavBar />
                  <SignIn />
                </div>
              )}
            />
           
          </Switch>
        )}
      />
    );
  }
}
export default Routes;
