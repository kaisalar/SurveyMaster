import React from 'react';
import styleClass from './Close.module.css'
import './Close.css'
import { Icon } from 'rsuite';

const Close = props => {
    return(
        <div className={styleClass.Close} onClick={props.clicked} onMouseEnter={props.hoverIn} onMouseLeave={props.hoverOut}>
            <Icon icon="close" size="lg"/>
        </div>

    );
}

export default Close
