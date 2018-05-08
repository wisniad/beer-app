import React from 'react'
import { connect } from 'react-redux'
import  { getBeersApi, getDetailsApi }from '../actions/beersApi'
import {Link} from 'react-router-dom';

class ListingView extends React.Component {
    state = {
        getting: false,
        beer: null
    };



    componentDidMount() {
        // this.props.getBeersApi(this.state.page)
        // console.log(this.state.page);
        console.log(this.props);
        this.props.getDetailsApi(this.props.match.params.id);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log('Single beer id 2', this.props.beers.beer[0].name);
    }



    render() {
        return (
            <div>
                <Link to="/">Go home</Link>
                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.beers.beer !== null && !this.props.beers.getting ?
                        <div>
                                <h1 key={this.props.beers.beer[0].id}>{this.props.beers.beer[0].name}</h1>

                        </div>
                        :
                        <p>Grabbing a beer...</p>
                }



            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.beers,
    page: state.page,
    details: state.details
});

const mapDispatchToProps = dispatch => ({
    getBeersApi: (page, ownProps) => dispatch(getBeersApi(page, ownProps)),
    getDetailsApi: (beerId) => dispatch(getDetailsApi(beerId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView)