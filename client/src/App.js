import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import SurveyBuilder from './Containers/SurveyBuilder/SurveyBuilder'
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <SurveyBuilder />
      </Layout>
      );
  }
}

export default App;

