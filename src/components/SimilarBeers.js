import React from 'react'
import {connect} from 'react-redux'
import {getSimilarApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';
import Grid from '@material-ui/core/Grid';

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
            <Grid container spacing={24} justify="space-around">
                {
                    !this.props.similar.gettingSimilars && this.props.similar.similar !== null ?
                        this.props.similar.similar
                            .slice(0, 3)
                            .map(
                                (beer, i) => (
                                    <Link key={i} to={"/beer/" + beer.id + "/" + beer.name}>
                                        <Grid item xs={2} align="center" justify="center" className="similarView">
                                            <img src={beer.image_url} className="detailedview__image" alt="Beer image"
                                                 align="center"/>
                                            <p className="detailedview__text similarView__beerName">
                                                <strong>{beer.name.split(' ', 2).join(' ')}</strong></p>
                                        </Grid>
                                    </Link>
                                )
                            )
                        :
                        <Grid item xs={12}>
                            <HashLoader
                                color={'FF2F2F'}
                                size={40}
                            />
                        </Grid>
                }
            </Grid>
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