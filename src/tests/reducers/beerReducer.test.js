import beerReducer from '../../reducers/beerReducer';

test('Should set default state', () => {
    const state = beerReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({
            "beer": null,
            "data": null,
            "error": null,
            "getting": false,
            "gettingSimilars": false,
            "hasMoreItems": true,
            "page": 1,
            "similar": null
        }
    )
});

