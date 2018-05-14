import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (

    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();