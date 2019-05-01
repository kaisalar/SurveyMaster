import React from 'react';
import styleClass from './Layout.module.css'
const Layout = props => {
    return(
        <div className={styleClass.Layout}>
            <main >{props.children}</main>     
        </div>
    );
} 

export default Layout
