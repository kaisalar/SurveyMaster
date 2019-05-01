import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import CreateSurvey from './Containers/CreateSurvey/CreateSurvey'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.callApi()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    if (response.status !== 200) throw Error(body);
    return body;
  };
  render() {
    return (
      <Layout>
        <CreateSurvey />
      </Layout>
      );
  }
}

export default App;

