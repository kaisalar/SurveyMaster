import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import CreateSurvey from './Containers/CreateSurvey/CreateSurvey'
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <CreateSurvey />
      </Layout>
      );
  }
}

export default App;

