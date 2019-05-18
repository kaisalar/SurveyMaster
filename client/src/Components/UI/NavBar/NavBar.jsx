// import React, { Component } from "react";
// import { NavLink, Redirect } from 'react-router-dom';
// import {
//     MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
//     MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
// } from "mdbreact";
// import styles from './NavBar.module.css'
// import { Button } from "semantic-ui-react";
// class NavbarPage extends Component {

//     render() {
//         return (
//             <div>
//                 <ul className={styles.ul}>
//                     <li><label className={styles.logo}>Survey Master</label> </li>
//                     <li>
//                         <NavLink to="/create" className={styles.a}><Button className={styles.btn}>Create Survey</Button></NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/surveys" className={styles.a}><Button >Show Surveys</Button></NavLink>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }
// }

// export default NavbarPage;

import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import {NavLink} from 'react-router-dom'
 import styles from './NavBar.module.css'


class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            
                <MDBNavbar color="transparent" dark expand="md" >
                <MDBNavbarBrand>
                    <strong className="white-text" style={{fontSize:'1.5rem'}}>Survey Master</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                {/* <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar> */}
                    <MDBNavbarNav left >
                        <MDBNavItem active>
                            <NavLink to="/" className={styles.a}>Home</NavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <NavLink to="/create" className={styles.a}>Create Survey</NavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <NavLink to="/surveys" className={styles.a}>Show Surveys</NavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBDropdown>
                                <div className={styles.a} style={{padding:0}}>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                                </div>

                                <MDBDropdownMenu className="dropdown-default" right >
                                    <MDBDropdownItem >
                                    <NavLink to ="/signin">
                                    <MDBIcon icon="sign-out-alt" />   

                                    Sign in
                                    </NavLink>
                                     </MDBDropdownItem>
                                    <MDBDropdownItem >
                                    <NavLink to="/signup">

                                    <MDBIcon icon="user-plus" />   
                                     Sign Up
                                    </NavLink>
                                     </MDBDropdownItem>
                                    
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                {/* </MDBCollapse> */}
            </MDBNavbar>
       
        );
    }
}

export default NavbarPage;