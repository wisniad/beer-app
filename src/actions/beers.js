// GET_BEERS

export const getBeers = (beers) => ({
    type: 'GET_BEERS',
    beers
});

export const startGetBeers = () => {
    return (dispatch, getState) => {
        return fetch('https://api.punkapi.com/v2/beers')
            .then(results => {
                return results.json();
            })
            .then(beer => {
                const beers = [];
                beers.push(beer);
                dispatch(getBeers(beers));
            });

    };
};

