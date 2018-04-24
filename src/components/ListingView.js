import React from 'react';
import { connect } from 'react-redux';
// import ExpenseListItem from './ExpenseListItem';
// import ExpenseListFilters from './ExpenseListFilters';
// import selectedExpenses from '../selectors/expenses';
const ListingView = (props) => (
    <div>
        <h1>Beer list</h1>
        {console.log(props.beers)}
        {/*<ExpenseListFilters/>*/}
        {/*{props.expenses.map( (expense) => {*/}
            {/*return <ExpenseListItem key={ expense.id }{...expense}/>*/}
        {/*})}*/}
    </div>
);


const mapStateToProps = (state) => {
    return {
        beers: state.beers
    };
};

export default connect(mapStateToProps)(ListingView);