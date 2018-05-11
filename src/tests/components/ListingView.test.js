import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListingView from '../../components/ListingView';


test('should render ListingView correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<ListingView/>);
    expect(renderer.getRenderOutput()).toMatchSnapshot();

    console.log(renderer.getRenderOutput());
})