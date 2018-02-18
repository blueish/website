import { createStore } from 'redux';
import homeReducer from './homeReducer';

export const makeHomeStore = () => {
    return createStore(
        homeReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};