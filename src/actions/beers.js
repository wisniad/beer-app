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
            .then(beers => {
                dispatch(getBeers(beers));
            });

    };
};
//
// // GET_SINGLE_BEER
//
// export const getSingleBeer = (beer) => ({
//     type: 'GET_SINGLE_BEER',
//     beer
// });
//
// export const startGetSingleBeer = () => {
//     return (dispatch, getState) => {
//         return fetch('https://api.punkapi.com/v2/beers/')
//             .then(results => {
//                 return results.json();
//             })
//             .then(beers => {
//                 dispatch(getBeers(beers));
//             });
//
//     };
// };
//
