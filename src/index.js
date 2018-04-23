import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { connect } from 'react-redux';
import {getBeers, startGetBeers} from "./actions/beers";
import configureStore from './store/configureStore';

const store = configureStore();


let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<App/>, document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading... </p>, document.getElementById('root'));

if (!hasRendered) {
    store.dispatch(startGetBeers()).then(() => {
        renderApp();
    });

}

registerServiceWorker();


