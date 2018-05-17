import React from 'react'
import {connect} from 'react-redux'
import {getSimilarApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import {Flex, Box} from 'reflexbox'

class SimilarBeers extends React.Component {

    componentDidMount() {
        this.props.getSimilarApi(
            Math.floor(this.props.similarAbv),
            Math.floor(this.props.similarEbc),
            Math.floor(this.props.similarIbu)
        );
    }

    render() {
        return (
            <Flex align='justify'
                  justify='space-around'
                  w={1} px={0} py={0}>
                {
                    !this.props.similar.gettingSimilars && this.props.similar.similar !== null ?
                        this.props.similar.similar
                            .slice(0, 3)
                            .map(
                                (beer, i) => (


                                    <Link key={i} to={"/beer/" + beer.id + "/" + beer.name}>

                                        <Box p={0} auto>
                                            <div className="similarView__border similarView" align="center">
                                                <img src={beer.image_url} className="detailedview__image" alt=""/>
                                                <p className="detailedview__text similarView__beerName"><strong>{
                                                    beer.name.length > 20 ?
                                                        beer.name.substring(0, 15) + '...'
                                                        : beer.name}</strong></p>
                                            </div>
                                        </Box>
                                    </Link>

                                )
                            )
                        :
                        <Box w={1} p={0}>
                            <HashLoader
                                color={'FF2F2F'}
                                size={40}
                            />
                        </Box>
                }
            </Flex>
        )
    }
}

const mapStateToProps = (state) => ({
    similar: state.beers
});

const mapDispatchToProps = dispatch => ({
    getSimilarApi: (similarAbv, similarEbc, similarIbu) => dispatch(getSimilarApi(similarAbv, similarEbc, similarIbu))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimilarBeers)