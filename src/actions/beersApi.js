const GET_BEGIN = 'beersApi/GET_BEGIN'
const GET_FIRST_SUCCESS = 'beersApi/GET_FIRST_SUCCESS'
const GET_SUCCESS = 'beersApi/GET_SUCCESS'
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
            data => dispatch({type: GET_SUCCESS, data, newPage, ownProps})
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
}


export const getSimilarApi = (similarAbv, similarEbc, similarIbu) => dispatch => {
    dispatch({type: GET_SIMILAR_BEGIN});
    Promise.all([
            fetch(
                `https://api.punkapi.com/v2/beers?abv_lt=${similarAbv}&page=1&per_page=10`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return beersToFilter
                        .sort((a, b) => parseFloat(a.abv) - parseFloat(b.abv))
                        .slice(0, 2);
                }
            ),
            fetch(
                `https://api.punkapi.com/v2/beers?ebc_lt=${similarEbc}&page=1&per_page=10`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return beersToFilter
                        .sort((a, b) => parseFloat(a.abv) - parseFloat(b.abv))
                        .slice(0, 2);
                }
            ),
            fetch(
                `https://api.punkapi.com/v2/beers?ibu_lt=${similarIbu}&page=1&per_page=10`
            ).then(
                response => response.json()
            ).then(
                beersToFilter => {
                    return beersToFilter
                        .sort((a, b) => parseFloat(a.abv) - parseFloat(b.abv))
                        .slice(0, 2);
                }
            ),

        ]
    ).then(values => {
        return values[0]
            .concat(values[1])
            .concat(values[2]);
    }).then(maybeDuplicates => {
        let seenIds = {};
        maybeDuplicates = maybeDuplicates.filter(function(currentObject) {
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

const initialState = {
    data: null,
    page: 1,
    getting: false,
    error: null,
    beer: null,
    gettingSimilars: false,
    similar: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GET_FIRST_SUCCESS:
            return {
                ...state,
                data: action.data,
                getting: false,
                page: action.newPage
            }
        case GET_SUCCESS:
            return {
                ...state,
                data: action.ownProps.concat(action.data),
                getting: false,
                page: action.newPage
            }

        case GET_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        case GET_DETAILS_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GET_DETAILS_SUCCESS:
            return {
                ...state,
                getting: false,
                beer: action.beer,
                beerExists: action.beer.length
            }
        case GET_DETAILS_FAIL:
            return {
                ...state,
                getting: false,
                error: true
            }
        case GET_SIMILAR_BEGIN:
            return {
                ...state,
                gettingSimilars: true,
                error: null
            }
        case GET_SIMILAR_SUCCESS:
            return {
                ...state,
                gettingSimilars: false,
                similar: action.similar
            }
        case GET_SIMILAR_FAIL:
            return {
                ...state,
                gettingSimilars: false,
                error: true
            }
        default:
            return state
    }
}