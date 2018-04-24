import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        This is from 404 Not found component <Link to="/">Go home</Link>
    </div>
);

export default NotFoundPage;