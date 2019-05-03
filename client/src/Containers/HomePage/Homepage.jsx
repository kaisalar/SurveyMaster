import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group'
import { MDBBtn } from 'mdbreact'
import { Link } from 'react-router-dom'
//import wallpaper from "../../assets/18924.jpg";
import styles from './Homepage.module.css'
class HomePage extends Component {
  
    render() {
        return (
            <TransitionGroup>
                <React.Fragment>
                    <div className={styles.fixedBar} >
                      <div className = {styles.Layout}>


                        <Link to="/create">
                            <MDBBtn>Create New Survey</MDBBtn></Link>
                            
                        <Link to="/surveys"><MDBBtn >Show Surveys</MDBBtn></Link>
                      </div>
                       </div>
                    

                </React.Fragment>
            </TransitionGroup>
        )
    }

}
export default HomePage;