import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import beersReducer from '../reducers/beerReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            beers: beersReducer
        }),
        composeEnhancers(
            applyMiddleware(thunk),
        )
    );
    return store;
};