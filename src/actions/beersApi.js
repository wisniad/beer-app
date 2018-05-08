const GET_BEGIN = 'beersApi/GET_BEGIN'
const GET_SUCCESS = 'beersApi/GET_SUCCESS'
const GET_FAIL = 'beersApi/GET_FAIL'


export const getBeersApi = (page) => dispatch => {
    let newPage =  parseInt(page)+1;
    dispatch({ type: GET_BEGIN });

    fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`
    ).then(
        response => response.json()
    ).then(
        data => dispatch({ type: GET_SUCCESS, data, newPage })
    ).catch(
        error => dispatch({ type: GET_FAIL, error })
    )
}



const initialState = {
    data: null,
    page: 1,
    getting: false,
    error: null
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GET_SUCCESS:
            return {
                ...state,
                data: action.data,
                getting: false,
                page: action.newPage
            }
        case GET_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        default:
            return state
    }
}