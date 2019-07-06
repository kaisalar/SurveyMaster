import React from 'react';
import * as moment from 'moment'
import './ResponseItem.css'


const ResponseItem= props => {
    let styleClass = "response-item"
    if (props.focused) styleClass += " focus"
    return(
        <div className={styleClass} onClick={props.clicked}>
            <div>{moment(props.date).format('DD-MM-YYYY')}</div>
        </div>
    );
}

export default ResponseItem
