import React from 'react'
import { connect } from 'react-redux'
import  { getBeersApi, getDetailsApi }from '../actions/beersApi'
import {Link} from 'react-router-dom';

class ListingView extends React.Component {
    state = {
        getting: false,
        beer: null,
        beerExists: false
    };



    componentDidMount() {
        // this.props.getBeersApi(this.state.page)
        // console.log(this.state.page);
        console.log(this.props);
        this.props.getDetailsApi(this.props.match.params.id);
        // this.setState( {error : this.props.beers.beer.length} )
            // ? this.setState( { beerExists: true } )
            // : this.setState( { beerExists: false } )




        // console.log(this.props.beers.beer.hasOwnProperty('statusCode')

        // if(this.props.beers.beer.hasOwnProperty('name')){
        //     alert("yes, i have that property");
        // }
            // ? this.setState( { beerExists: true } )
            // : this.setState( { beerExists: false } )

    }

    handleSubmit = (event) => {
        event.preventDefault();
        }



    render() {
        return (
            <div>
                <Link to="/">Go home</Link>
                {/*{*/}
                    {/*// this.props.beers.beer.error && <p>{this.props.beers.beer.error.message}</p>*/}
                   {/*/!*<p>{hasOwnProperty(this.props.beers.beer,'statusCode')}</p>*!/*/}
                {/*}*/}



                {
                    !this.props.beers.getting  ?
                        this.props.beers.beer !== null && this.props.beers.beerExists?
                            <div>
                                <h1 key={this.props.beers.beer[0].id}>{this.props.beers.beer[0].name}</h1>
                            </div>
                            :
                            <p>Beer with id: {this.props.match.params.id} doesn't exists.</p>
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
    details: state.details,
    beerExists: state.beerExists
});

const mapDispatchToProps = dispatch => ({
    getBeersApi: (page, ownProps) => dispatch(getBeersApi(page, ownProps)),
    getDetailsApi: (beerId) => dispatch(getDetailsApi(beerId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView)