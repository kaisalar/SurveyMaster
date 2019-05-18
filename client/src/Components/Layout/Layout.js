import React from 'react';
import styleClass from './Layout.module.css'
const Layout = props => {
    let classNames = styleClass.Layout;
    if(props.sideOpened) { 
        classNames = styleClass.Layout + " " + styleClass.SideOpened
    } 
    console.log(props.className)
    if(props.className === "formLayout"){
        classNames = styleClass.formLayout
    }
    return(
        <div className={classNames}>
        <main >{props.children}</main>     
    </div>
    );
} 

export default Layout
