import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn
} from "mdbreact";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {Dropdown} from 'rsuite'
import styles from './NavBar.module.css'

const Styles = {
    logo: { fontSize: '1.5rem', color: "#2BBBAD !important" },
    btn: {
        background: 'none',
        borderRadius: '5px',
        height: '30px',
        width: '90px',
        fontSize: '1rem',
        padding: '0',
        borderColor: "#7E9C9E",
        color: "#7E9C9E",
        marginRight:'5px'
    },
    link: { textDecoration: 'none' }


}
class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        let user = this.props.currentUser
        return (
            <MDBNavbar color="transparent" dark expand="md" >
                <MDBNavbarBrand color="#2BBBAD " >
                    <strong className={styles.logo} style={Styles.logo}>Survey Master</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBNavbarNav left >
                    <MDBNavItem active>
                        <NavLink to="/" className={styles.a} style={Styles.link}>Home</NavLink>
                    </MDBNavItem>
                    {user ?
                        <React.Fragment>
                            <MDBNavItem>
                                <NavLink to="/create" className={styles.a} style={Styles.link}>Create Survey</NavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <NavLink to="/surveys" className={styles.a} style={Styles.link}>Show Surveys</NavLink>
                            </MDBNavItem>
                            <MDBNavbarNav right>
                              
                                <MDBNavItem >

                                </MDBNavItem>
                            </MDBNavbarNav>
                          

                        </React.Fragment>
                        : null}
                </MDBNavbarNav>
                {user && <MDBNavbarNav right>
                    <MDBNavItem>

                        <h2 className={styles.h2}>Hey,{user.firstName}</h2>
                    </MDBNavItem>
                           <button type="button" className="btn btn-outline-info" style={Styles.btn}>

                                        <NavLink to="/signout" style={Styles.link}>Sign out</NavLink>
                                    </button>
                         
                </MDBNavbarNav>}
                    {!user &&
                <MDBNavbarNav right>

                            <MDBNavItem>
                                <NavLink to="/signup" style={Styles.btn}>
                                    <button type="button" className="btn btn-outline-info" style={Styles.btn}>
                                        Sign Up
                            </button>
                                </NavLink>

                                <MDBNavbarNav right>
                                    <NavLink to="/signin" style={{ textDecoration: 'none' }}>
                                        <button type="button" className="btn btn-outline-info" style={Styles.btn}>
                                            Sign in
                                    </button>
                                    </NavLink>

                                </MDBNavbarNav>

                            </MDBNavItem>
                </MDBNavbarNav>
                    }
                {/* </MDBCollapse> */}
            </MDBNavbar>

        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.token,
    currentUser: state.viewSurvey.currentUser
})

export default connect(mapStateToProps)(NavbarPage);