import React from 'react';
import styleClass from './BackDrop.module.css'

const BackDrop = props => {
    let classNames = styleClass.BackDrop;
    if(props.invisible) { 
        classNames =  classNames + " " + styleClass.Invisible
    }
    return(
        <div className={classNames} onClick={props.clicked} />
    );
}

export default BackDrop 
