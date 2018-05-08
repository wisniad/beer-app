const GET_BEGIN = 'beersApi/GET_BEGIN'
const GET_FIRST_SUCCESS = 'beersApi/GET_FIRST_SUCCESS'
const GET_SUCCESS = 'beersApi/GET_SUCCESS'
const GET_FAIL = 'beersApi/GET_FAIL'

const GETDETAILS_BEGIN = 'beersApi/GETDETAILS_BEGIN'
const GETDETAILS_SUCCESS = 'beersApi/GETDETAILS_SUCCESS'
const GETDETAILS_FAIL = 'beersApi/GETDETAILS_FAIL'


export const getBeersApi = (page, ownProps) => dispatch => {
    let newPage =  parseInt(page)+1;
    dispatch({ type: GET_BEGIN });
    if(page===1) {
        fetch(
            `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`
        ).then(
            response => response.json()
        ).then(
            data => dispatch({ type: GET_FIRST_SUCCESS, data, newPage})
        ).catch(
            error => dispatch({ type: GET_FAIL, error })
        )
    }
    else{
        fetch(
            `https://api.punkapi.com/v2/beers?page=${page}&per_page=20`
        ).then(
            response => response.json()
        ).then(
            data => dispatch({ type: GET_SUCCESS, data, newPage, ownProps })
        ).catch(
            error => dispatch({ type: GET_FAIL, error })
        )
    }

};


export const getDetailsApi = (beerId) => dispatch => {
    dispatch({ type: GETDETAILS_BEGIN });

    fetch(
        `https://api.punkapi.com/v2/beers/${beerId}`
    ).then(
        response => response.json()
    ).then(
        details => dispatch({ type: GETDETAILS_SUCCESS, details})
    ).catch(
        error => dispatch({ type: GETDETAILS_FAIL, error })
    )
}

const initialState = {
    data: null,
    page: 1,
    getting: false,
    error: null,
    details: null
}

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
        case GETDETAILS_BEGIN:
            return {
                ...state,
                getting: true,
                error: null
            }
        case GETDETAILS_SUCCESS:
            return {
                ...state,
                getting: false,
                details: action.details
            }
        case GETDETAILS_FAIL:
            return {
                ...state,
                getting: false,
                error: action.error
            }
        default:
            return state
    }
}