import React from 'react';
import {Link} from 'react-router-dom';
import {Flex} from 'reflexbox'

const NotFoundPage = () => (
        <Flex
            align='center'
            justify='center'
            column
            w={1}
            px={1}
            py={2}>
            <h2>This is from 404 Not found page <Link to="/">Go to main page</Link></h2></Flex>
);

export default NotFoundPage;