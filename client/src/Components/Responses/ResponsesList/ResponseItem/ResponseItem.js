import React from 'react';
import * as moment from 'moment'


const ResponseItem= props => {
    return(
        <div className="response-item">
            <div onClick={props.clicked}>Date: {moment(props.date).format('DD-MM-YYYY')}</div>
        </div>
    );
}

export default ResponseItem
