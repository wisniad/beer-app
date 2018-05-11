import React from 'react';
import MemoryRouter from 'react-router';
import NotFoundPage from '../../components/NotFoundPage';
import Header from '../../components/Header';
import AppRouter from '../../routers/AppRouter';
import ListingView from "../../components/ListingView";
import { mount } from 'enzyme';

test('valid path should not redirect to 404', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[ '/' ]}>
            <AppRouter/>
        </MemoryRouter>
    );
    expect(wrapper.find(ListingView)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});