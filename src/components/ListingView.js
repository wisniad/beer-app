import React from 'react'
import {connect} from 'react-redux'
import {getBeersApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller'

class ListingView extends React.Component {

    state = {
            beers: [],
            getting: false,
            page: 1,
            hasMoreItems: false,
            nextHref: null
    };

    divStyle = {
        height: '150px',
        width: '200px'
    };

    componentDidMount() {
        this.props.getBeersApi(this.state.page)
    }

    loadMore = () => {
        if(parseInt(this.props.beers.page) < 13) {
            this.setState({page: this.state.page + 1});
            this.props.getBeersApi(this.props.beers.page, this.props.beers.data);
        }
        else {
            this.setState({
                hasMoreItems: false
            });
        }
    };

    render() {
        let items = [];
        (this.props.beers.data || []).map(
            (beer, i)=> items.push(
                <Link key={i} to={"/beer/" + beer.id + "/" + beer.name}>
                    <li key={beer.id}
                        style={this.divStyle}
                    >
                        ID: {beer.id}. {beer.name}
                    </li>
                </Link>
            )
        );

        return (
            <div>
                <h1>Beers</h1>

                <InfiniteScroll
                    pageStart={0}
                    hasMore={
                        this.props.beers.data !== null &&
                        !this.props.beers.getting &&
                        this.props.beers.page < 13
                    }
                    loadMore={this.loadMore}
                >
                    <ul>
                        {items}
                    </ul>
                </InfiniteScroll>

                {
                    this.state.error && <p>{this.state.error.message}</p>
                }

                {
                    this.props.beers.getting && <div>
                        <p>Grabbing beers...</p>
                        <HashLoader
                            color={'FF2F2F'}
                        /></div>
                }

                {
                    this.props.beers.page === 13 &&
                    <p>That was it. No more beers to load.</p>
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.beers,
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    getBeersApi: (page, ownProps) => dispatch(getBeersApi(page, ownProps))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView)