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


const initialState = {
    data: null,
    page: 1,
    getting: false,
    error: null,
    beer: null,
    gettingSimilars: false,
    similar: null,
    hasMoreItems:true
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
        case GET_SUCCESS_NO_MORE_ITEMS:
            return {
                ...state,
                data: action.ownProps.concat(action.data),
                getting: false,
                page: action.newPage,
                hasMoreItems: false
            }
        case GET_FAIL:
            return {
                ...state,
                getting: false,
                error: true
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