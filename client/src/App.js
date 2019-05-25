import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import jwtDecode from "jwt-decode";
import Routes from './Routes'
import './App.css'
import NavBar from './Components/UI/NavBar/NavBar'

class App extends Component {
  state={}
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("item");
      const user = jwtDecode(jwt);
      console.log("user",user);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    console.log(this.state, this.props, window.location.href);
    return (
      <BrowserRouter basename="/" >
        <div>
        {
        <Routes users={this.state.users} />
        
        }  
    
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  isFill: state.viewSurvey.isFill 
});
export default connect(mapStateToProps)(App);

