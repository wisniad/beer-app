import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import DetailedView from 'components/DetailedView';
import ListingView from 'components/ListingView';
import NotFoundPage from 'components/NotFoundPage';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={ListingView} />
                        <Route path="/detailed" component={DetailedView} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;