import React from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import DetailedView from '../components/DetailedView';
import ListingView from '../components/ListingView';
import NotFoundPage from '../components/NotFoundPage';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={ListingView} exact={true} />
                <Route path="/beer/:id/:beerName" component={DetailedView} />
                <Route path="/beer/:id" component={DetailedView} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;