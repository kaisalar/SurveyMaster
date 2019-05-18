import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'
//import wallpaper from "../../assets/18924.jpg";
import styles from './Homepage.module.css'
import {Button} from 'semantic-ui-react'
import Divider from '../../Components/UI/divider/Divider'

class HomePage extends Component {
  
    render() {
        return (<div>  </div>
            // <TransitionGroup>
            //     <React.Fragment>
            //         <div className={styles.fixedBar} >
            //           <div className = {styles.Layout}>


            //             <Link to="/create">
            //                     <Button>Create New Survey</Button></Link>
                            
            //             <Link to="/surveys"><Button >Show Surveys</Button></Link>
            //           </div>
            //            </div>
                    

            //     </React.Fragment>
            // </TransitionGroup>
        )
    }

}
export default HomePage;