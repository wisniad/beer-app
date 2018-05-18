import React from 'react';
import {Link} from 'react-router-dom';
import {Flex, Box} from 'reflexbox';
import Header from './Header';
import Grid from '@material-ui/core/Grid';

const NotFoundPage = () => (
    <div>

                <Header/>

        <Grid container spacing={24}>

        <Grid item xs={12} align="center">
                <h2 className="notfoundpage__paddingTop">404 Not found page</h2>
                <h2><Link className="notfoundpage_link" to="/">Go to main page</Link></h2>
            </Grid>
        </Grid>
    </div>

);

export default NotFoundPage;
