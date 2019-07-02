import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "semantic-ui-css/semantic.min.css";
import * as registerServiceWorker from './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'rsuite/dist/styles/rsuite.min.css';
import {Provider} from 'react-redux';
import store from './store/store'
import App from './App';


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker.unregister();
