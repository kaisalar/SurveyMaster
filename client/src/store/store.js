import { createStore } from 'redux';
import rootReducer from './reducer'

const Store = createStore(rootReducer);

export default Store