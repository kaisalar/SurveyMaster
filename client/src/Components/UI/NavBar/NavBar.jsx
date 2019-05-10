import React, { Component } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import styles from './NavBar.module.css'
import { Button } from "semantic-ui-react";
class NavbarPage extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li><label className={styles.logo}>Survey Master</label> </li>
                    <li>
                        <NavLink to="/create" ><Button className={styles.btn}>Create Survey</Button></NavLink>
                    </li>
                    <li>
                        <NavLink to="/surveys"><Button >Show Surveys</Button></NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavbarPage;