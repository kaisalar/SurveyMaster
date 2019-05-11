import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/Homepage";
// import Surveys from "./Containers/ShowSurveys/Surveys List/Surveys";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
// import SurveyFillList from './Containers/ShowSurveys/Survey questions List/SurveyFillList'
import asyncComponent from './hoc/asyncComponent'
import './Routes.css';
// import NavBar from "./Components/UI/NavBar/NavBar";
const TransitionPages = (props) => {
  return <CSSTransition
    {...props}
  //  classNames="fadeTranslate"
    timeout={800}
    mountOnEnter={true}
    unmountOnExit={true}
  />;
}

const SurveyBuilder = asyncComponent(() => {
  return import('./Containers/SurveyBuilder/SurveyBuilder')
})
const SurveyFillList = asyncComponent(() => {
  return import("./Containers/ShowSurveys/Survey questions List/SurveyFillList");
});
const Surveys = asyncComponent(() => {
  return import("./Containers/ShowSurveys/Surveys List/Surveys");
});
class Routes extends Component {
  render() {
    return (
      <Route
        render={() => (
        
                <Switch>
                  {/* <Route path="/" component={NavBar}/> */}
                  <Route path="/fill/:id" component={SurveyFillList} />
                  <Route path="/create" component={SurveyBuilder} />
                  <Route path="/surveys" component={Surveys} />
                  <Route path="/" component={HomePage} />
                </Switch>
            
        )}
      />
    );
  }
}
export default Routes;
