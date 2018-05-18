import React from 'react'
import {connect} from 'react-redux'
import {getBeersApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';
import {Header} from './Header';
import {Flex, Box} from 'reflexbox'
import Grid from '@material-ui/core/Grid';

class ListingView extends React.Component {

    state = {
        beers: [],
        getting: false,
        page: 1,
    };

    componentDidMount() {
        this.props.getBeersApi(this.props.beers.page, this.props.beers.data);
    }


    loadMore = () => {
        if (this.props.beers.hasMoreItems) {
            this.setState({page: this.state.page + 1});
            this.props.getBeersApi(this.props.beers.page, this.props.beers.data);
        }
    };

    render() {
        let items = [];
        if (this.props.beers.data) {
            (this.props.beers.data).map(
                (beer, i) => items.push(
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} align="center" justify="space-around">
                        <Link to={"/beer/" + beer.id + "/" + beer.name}>
                            <div className="listingView__beerSize listingView__beerBackground listingView" >
                                <img src={beer.image_url} width="40" height="150" alt=""/>
                                <h2 className="detailedview__main_beer">
                                    {   beer.name.split(' ',2).join(' ')}
                                        </h2>
                                <h3 className="listingView__main_tagline">{   beer.tagline.split(' ',4).join(' ')}</h3>
                            </div>
                        </Link>
                    </Grid>
                )
            )
            ;
        }
        return (
            <div>
                <Header/>


                <InfiniteScroll
                    pageStart={0}
                    hasMore={
                        this.props.beers.data !== null &&
                        !this.props.beers.getting &&
                        this.props.beers.hasMoreItems
                    }
                    // hasMore={false}
                    loadMore={this.loadMore} className="listingView__centerByMargins"
                >

                    <Grid container spacing={24} direction="row" justify="space-around">

                        {items}
                    </Grid>


                    {
                        this.props.beers.hasMoreItems === false &&
                        <h2>That was it. No more beers to show.</h2>
                    }
                    {
                        this.props.beers.error && <h2>Check your internet.</h2>
                    }

                    {
                        this.props.beers.getting && <Grid item xs={12}>
                            <h2>Grabbing beers...</h2>
                            <HashLoader
                                color={'FF2F2F'}
                            /></Grid>
                    }


                </InfiniteScroll>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
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