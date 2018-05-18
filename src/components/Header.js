import React from 'react';
import Grid from '@material-ui/core/Grid';

export const Header = () => (
    <Grid container spacing={24} direction="column" align="center" className="header">
        <Grid item xs={12}>
            <header>
                <div>
                    <h1 className="header__tittle">Beer list</h1>
                    <h2 className="header__subtitle">What will be your future beer?</h2>
                </div>
            </header>
        </Grid>
    </Grid>
);

export default Header;