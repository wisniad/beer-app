import React from 'react';
import {Link} from 'react-router-dom';
import {Flex, Box} from 'reflexbox';
import Header from './Header';

const NotFoundPage = () => (
    <div>
        <Flex
            justify='center'
            w={1}
            className="header"
            mt={0}
            px={0}
            py={0}>
            <Box p={0}>
                <Header/>
            </Box>
        </Flex>
        <Flex
            justify='center'
            wrap
            w={1}
            style={{height: '100%'}}
            mt={0}
            px={0}
            py={0}>
            <Box p={0}>
                <h2 className="notfoundpage__paddingTop">404 Not found page</h2>
                <h2><Link className="notfoundpage_link" to="/">Go to main page</Link></h2>
            </Box>
        </Flex>
    </div>

);

export default NotFoundPage;