import React from 'react'
import {connect} from 'react-redux'
import {getBeersApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';

class ListingView extends React.Component {

    state = {
        beers: [],
        getting: false,
        page: 1,
    };

    divStyle = {
        height: '150px',
        width: '200px',
        backgroundColor: '#E0EDFF',
        border: 'dashed'
    };
    divStyle2 = {
        // height: '150px',
        // width: '200px',
        backgroundColor: '#f6ffbd',
        border: 'dotted'
    };

    componentDidMount() {
        this.props.getBeersApi(this.state.page)
    }

    loadMore = () => {
        if (this.props.beers.hasMoreItems) {
            this.setState({page: this.state.page + 1});
            this.props.getBeersApi(this.props.beers.page, this.props.beers.data);
        }
    };

    render() {
        let items = [];
        (this.props.beers.data || []).map(
            (beer, i) => items.push(
                <div key={i} style={this.divStyle2}>
                    <Link to={"/beer/" + beer.id + "/" + beer.name}>
                            <img src={beer.image_url} width="40" height="150" alt=""/>
                            <h2>{beer.name}</h2>
                            <p>{beer.tagline}</p>
                    </Link>
                </div>
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
                        this.props.beers.hasMoreItems
                    }
                    loadMore={this.loadMore}
                >
                    {items}

                </InfiniteScroll>

                {
                    this.props.beers.error && <p>Check your internet.</p>
                }

                {
                    this.props.beers.getting && <div>
                        <p>Grabbing beers...</p>
                        <HashLoader
                            color={'FF2F2F'}
                        /></div>
                }

                {
                    this.props.beers.hasMoreItems === false &&
                    <p>That was it. No more beers to show.</p>
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    beers: state.beers,
    page: state.page,
    hasMoreItems: state.hasMoreItems
});

const mapDispatchToProps = dispatch => ({
    getBeersApi: (page, ownProps) => dispatch(getBeersApi(page, ownProps))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView)