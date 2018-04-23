// Expenses Reducer

const beersReducerDefaultState = [];
export default (state = beersReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_BEERS':
            return action.beers;
        default:
            return state;
    }
};