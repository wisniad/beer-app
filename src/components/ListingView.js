import React from 'react'
import { connect } from 'react-redux'
import  { getBeersApi, getDetailsApi }from '../actions/beersApi'

class ListingView extends React.Component {
    state = {
            beers: [],
            getting: false,
            page: 1
        };



    componentDidMount() {
        this.props.getBeersApi(this.state.page)
        console.log(this.state.page);
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Strona: "+this.props.beers.page)
        console.log('this state', this.state)

        this.setState( { page: this.state.page+1});
        this.props.getBeersApi(this.props.beers.page,this.props.beers.data);

        //single beer
        // this.props.getDetailsApi(2);
        // console.log('Single beer id 2', this.props.beers.details);
    }



    render() {
        return (
            <div>
                <h1>Beers</h1>
                { <p>This is amount of page in props {this.props.beers.page}</p>}
                <ul>
                    {
                        (this.props.beers.data !== null
                            ? this.props.beers.data.slice(0, this.state.page*20)
                                : []).map(
                            beer=> (
                                <li
                                    key={beer.id}
                                >
                                    {beer.name}


                                </li>
                            )
                        )
                    }
                </ul>
                <button onClick={ this.handleSubmit } type="submit">
                    Load more
                </button>
                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.beers.getting && <p>Getting beers...</p>
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