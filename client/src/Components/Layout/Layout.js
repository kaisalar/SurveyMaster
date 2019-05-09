import React from 'react';
import styleClass from './Layout.module.css'
const Layout = props => {
    let classNames = styleClass.Layout;
    if(props.sideOpened) { 
        classNames = styleClass.Layout + " " + styleClass.SideOpened
    } 
    return(
        <div className={classNames}>
        <main >{props.children}</main>     
    </div>
    );
} 

export default Layout
