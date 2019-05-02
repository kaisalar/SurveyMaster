import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import SurveyBuilder from './Containers/SurveyBuilder/SurveyBuilder'
import Routes from './Routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

