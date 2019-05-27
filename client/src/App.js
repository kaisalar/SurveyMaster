import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {currentUser} from './store/actions/viewAction'
import jwtDecode from "jwt-decode";
import Routes from './Routes'
import './App.css'
import NavBar from './Components/UI/NavBar/NavBar'

class App extends Component {
  state={}
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
      this.props.currentUser(user)
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <BrowserRouter >
        <Routes />
      </BrowserRouter>
    );
  }
}
// const mapStateToProps = state => ({
//   isFill: state.viewSurvey.isFill 
// });
export default connect(
  null,
  { currentUser}
)(App);

