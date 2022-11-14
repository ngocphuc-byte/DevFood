import { createStore, applyMiddleware } from 'redux';
import Reducers from '../Reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
export const  store = createStore(
    Reducers,
    applyMiddleware(...middleware),
)