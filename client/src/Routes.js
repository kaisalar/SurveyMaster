import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/Homepage";
import Surveys from "./Containers/ShowSurveys/Surveys List/Surveys";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SurveyBuilder from "./Containers/SurveyBuilder/SurveyBuilder";
import SurveyFillList from './Containers/ShowSurveys/Survey questions List/SurveyFillList'

class Routes extends Component {
  render() {
    return (
      <Route render ={({location}) => (
    

      <TransitionGroup > 
      <CSSTransition 
      key ={ location.key}
      timeout={450}
      classNames="slide">
<Switch location={location}>
        <Route path="/" exact component={HomePage} />
        <Route path="/fill/:id" component={SurveyFillList} />
        <Route path="/create" component={SurveyBuilder} />
        <Route path="/surveys" component={Surveys} />
      </Switch>
       </CSSTransition>
     </TransitionGroup>

       )}/>
    );
  }
}
export default Routes;
