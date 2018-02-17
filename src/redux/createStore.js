import { createStore } from 'redux';
import myReducer from './reducer';

export const makeMyStore = () => {
    return createStore(
        myReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};