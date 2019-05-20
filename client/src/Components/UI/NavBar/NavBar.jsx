

import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler,  MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import { NavLink } from 'react-router-dom'
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
                <MDBNavbarBrand color="#2BBBAD " >
                    <strong className={styles.logo} style={{ fontSize: '1.5rem', color:"#2BBBAD !important"}}>Survey Master</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                {/* <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar> */}
                <MDBNavbarNav left >
                    <MDBNavItem active>
                        <NavLink to="/" className={styles.a} style={{ textDecoration: 'none' }}>Home</NavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <NavLink to="/create" className={styles.a} style={{ textDecoration: 'none' }}>Create Survey</NavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <NavLink to="/surveys" className={styles.a} style={{ textDecoration: 'none' }}>Show Surveys</NavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBDropdown>
                            <div className={styles.a} style={{ padding: 0 }}>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                            </div>

                            <MDBDropdownMenu className="dropdown-default" right >
                                <MDBDropdownItem >
                                    <NavLink to="/signin" style={{ textDecoration: 'none' }}>
                                        <MDBIcon icon="sign-in-alt" />
                                        <label style={{ marginLeft: '10px' }} >
                                            Sign in
                                        </label>
                                    </NavLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem >
                                    <NavLink to="/signup" style={{ textDecoration: 'none' }}>

                                        <MDBIcon icon="user-plus" />
                                        <label style={{ marginLeft: '10px' }} >
                                            Sign Up
                                        </label>
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