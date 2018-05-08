import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';

// import {getBeers, startGetBeers} from "./actions/beers";
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (

    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

// let hasRendered = false;

ReactDOM.render(<App/>, document.getElementById('root'));

// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(<App/>, document.getElementById('root'));
//         hasRendered = true;
//     }
// };

// ReactDOM.render(<p>Loading... </p>, document.getElementById('root'));

// if (!hasRendered) {
//     store.dispatch(startGetBeers()).then(() => {
//         renderApp();
//     });
//
// }

registerServiceWorker();


