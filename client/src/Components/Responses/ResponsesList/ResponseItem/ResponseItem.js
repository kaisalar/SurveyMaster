import React from 'react';
import * as moment from 'moment'
import './ResponseItem.css'


const ResponseItem= props => {
    return(
        <div className="response-item" onClick={props.clicked}>
            <div>{moment(props.date).format('DD-MM-YYYY')}</div>
        </div>
    );
}

export default ResponseItem
