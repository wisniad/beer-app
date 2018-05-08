import React from 'react'
import { connect } from 'react-redux'
import  { getBeersApi }from '../actions/beersApi'

class ListingView extends React.Component {
    state = {
        beers: [],
        getting: false,
        page: 1
    }

    componentDidMount() {
        this.props.getBeersApi(this.state.page)
        console.log(this.state.page)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Strona: "+this.props.beers.page)
        this.props.getBeersApi(this.props.beers.page)
    }



    render() {
        return (
            <div>
                <h1>Beers</h1>




                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.beers.getting && <p>Getting friends...</p>
                }
                { <p>This is amount of page in props {this.props.beers.page}</p>}
                <ul>
                    {
                        (this.props.beers.data || []).map(
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

            </div>
        )
    }
}

const mapStateToProps = state => ({
    beers: state.beers,
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    getBeersApi: (page) => dispatch(getBeersApi(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView)