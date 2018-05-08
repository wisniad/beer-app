// GET_BEERS

export const getBeers = (beers) => ({
    type: 'GET_BEERS',
    beers
});

export const startGetBeers = () => {
    return (dispatch, getState) => {
        // console.log(getState().beers.length+1)
        const page = getState().beers.length+1;
        return fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=20`)
            .then(results => {
                return results.json();
            })
            .then(beers => {
                dispatch(getBeers(beers));
            });

    };

};


// this.setState({ loading: true });
// axios
//     .get(`https://api.github.com/users?since=${page}&per_page=100`)
//     .then(res => {
//         this.setState({ beers: [...this.state.beers, ...res.data] });
//         this.setState({ loading: false });
//     });


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
