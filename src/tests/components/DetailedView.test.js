import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import NotFoundPage from '../../components/NotFoundPage';


test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<NotFoundPage/>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    // console.log(renderer.getRenderOutput());
});