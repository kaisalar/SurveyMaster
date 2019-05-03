import React from 'react';
import ReactDOM from 'react-dom';
import { Slider } from 'material-ui-slider';

export default function App() {
    let value = 0;
    let valueChanged = (event) => {
        value = event.target.value
    }
    return (
        <div>

            <Slider defaultValue={10} min={0} max={10} />
        <label value={value} ></label>
        </div>
    );
}

