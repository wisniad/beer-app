const GET_BEGIN = 'beersApi/GET_BEGIN'
const GET_FIRST_SUCCESS = 'beersApi/GET_FIRST_SUCCESS'
const GET_SUCCESS = 'beersApi/GET_SUCCESS'
const GET_SUCCESS_NO_MORE_ITEMS = 'beersApi/GET_SUCCESS_NO_MORE_ITEMS'
const GET_FAIL = 'beersApi/GET_FAIL'

const GET_DETAILS_BEGIN = 'beersApi/GET_DETAILS_BEGIN'
const GET_DETAILS_SUCCESS = 'beersApi/GET_DETAILS_SUCCESS'
const GET_DETAILS_FAIL = 'beersApi/GET_DETAILS_FAIL'

const GET_SIMILAR_BEGIN = 'beersApi/GET_SIMILAR_BEGIN'
const GET_SIMILAR_SUCCESS = 'beersApi/GET_SIMILAR_SUCCESS'
const GET_SIMILAR_FAIL = 'beersApi/GET_SIMILAR_FAIL'

export const getBeersApi = (page, ownProps) => dispatch => {
    let newPage = parseInt(page, 10) + 1;
    dispatch({type: GET_BEGIN});
    if (page === 1) {
        fetch(
            `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`
        ).then(
            response => response.json()
        ).then(
            data => dispatch({type: GET_FIRST_SUCCESS, data, newPage})
        ).catch(
            error => dispatch({type: GET_FAIL, error})
        )
    }
    else {
        fetch(
            `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`
        ).then(
            response => response.json()
        ).then(
            data => {
                if (data.length > 0) {
                    dispatch({type: GET_SUCCESS, data, newPage, ownProps})
                }
                else {
                    dispatch({type: GET_SUCCESS_NO_MORE_ITEMS, data, newPage, ownProps})
                }
            }
        ).catch(
            error => dispatch({type: GET_FAIL, error})
        )
    }

};

export const getDetailsApi = (beerId) => dispatch => {
    dispatch({type: GET_DETAILS_BEGIN});
    fetch(
        `https://api.punkapi.com/v2/beers/${beerId}`
    ).then(
        response => response.json()
    ).then(
        beer => dispatch({type: GET_DETAILS_SUCCESS, beer})
    ).catch(
        error => dispatch({type: GET_DETAILS_FAIL, error})
    )
};

function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

export const getSimilarApi = (similarAbv, similarEbc, similarIbu) => dispatch => {
    dispatch({type: GET_SIMILAR_BEGIN});
    Promise.all([
            fetch(
                `https://api.punkapi.com/v2/beers?abv_lt=${similarAbv}&page=1&per_page=30`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return shuffle(beersToFilter)
                        .slice(0, 4);
                }
            ),
            fetch(
                `https://api.punkapi.com/v2/beers?ebc_lt=${similarEbc}&page=1&per_page=30`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return shuffle(beersToFilter)
                        .slice(0, 4);
                }
            ),
            fetch(
                `https://api.punkapi.com/v2/beers?ibu_lt=${similarIbu}&page=1&per_page=30`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return shuffle(beersToFilter)
                        .slice(0, 4);
                }
            ),

        ]
    ).then(values => {
        return shuffle(values[0]
            .concat(values[1])
            .concat(values[2]));
    }).then(maybeDuplicates => {
        let seenIds = {};
        maybeDuplicates = maybeDuplicates.filter(function (currentObject) {
            if (currentObject.id in seenIds) {
                return false;
            } else {
                seenIds[currentObject.id] = true;
                return true;
            }
        });
        return maybeDuplicates;

    }).then(
        similar => {
            dispatch({type: GET_SIMILAR_SUCCESS, similar})
        }
    ).catch(
        error => dispatch({type: GET_SIMILAR_FAIL, error})
    )
};

