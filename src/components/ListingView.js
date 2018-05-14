import React from 'react'
import {connect} from 'react-redux'
import {getBeersApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';
import {Header} from './Header';
import {Flex, Box} from 'reflexbox'

class ListingView extends React.Component {

    state = {
        beers: [],
        getting: false,
        page: 1,
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
                <Box p={1} w={280} h={280} key={i} className="listingView" >
                    <Link to={"/beer/" + beer.id + "/" + beer.name}>
                        <Flex
                            align='center'
                            justify='center'
                            column
                            w={1}
                            px={1}
                            py={2}>
                            <img src={beer.image_url} width="40" height="150" alt=""/>
                            <h2 className="listingView__beer_name">{beer.name}</h2>
                            <h3 className="listingView__beerTagline">{beer.tagline}</h3>
                        </Flex>
                    </Link>
                </Box>
            )
        );

        return (
            <div>


                    <InfiniteScroll
                        pageStart={0}
                        hasMore={
                            this.props.beers.data !== null &&
                            !this.props.beers.getting &&
                            this.props.beers.hasMoreItems
                        }
                        loadMore={this.loadMore}
                    >
                        <Flex
                            justify='center'
                            w={1}
                            className="header"
                            mt={0}
                            px={0}
                            py={0}>
                            <Box p={0}>
                                <Header/>
                            </Box>
                        </Flex>
                        <Flex
                            justify='center'
                            wrap
                            w={1}
                            style={{height: '100%'}}
                            mt={0}
                            px={0}
                            py={0}>
                            {items}
                            {
                                this.props.beers.error && <p>Check your internet.</p>
                            }

                            {
                                this.props.beers.getting && <Box p={0} w={300} h={300}>
                                    <p>Grabbing beers...</p>
                                    <HashLoader
                                        color={'FF2F2F'}
                                    /></Box>
                            }

                            {
                                this.props.beers.hasMoreItems === false &&
                                <p>That was it. No more beers to show.</p>
                            }
                        </Flex>
                    </InfiniteScroll>


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