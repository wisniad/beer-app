import React from 'react'
import {connect} from 'react-redux'
import {getSimilarApi} from '../actions/beersApi'
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';

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
            <div>
                {
                    !this.props.similar.gettingSimilars && this.props.similar.similar !== null ?
                        this.props.similar.similar
                            .slice(0, 3)
                            .map(
                                (beer, i) => (


                                            <div className="card">
                                                <Link key={i} to={"/beer/" + beer.id + "/" + beer.name}>
                                                    <img src={beer.image_url} width="25" height="66" alt=""/>
                                                    <h2>{beer.name}</h2>
                                                </Link>

                                                <p><strong>IBU:</strong>{beer.ibu}</p>
                                                <p><strong>ABV:</strong>{beer.abv}</p>
                                                <p><strong>EBC:</strong>{beer.ebc}</p>
                                            </div>

                                )
                            )
                        : <HashLoader
                            color={'FF2F2F'}
                            size={20}
                        />
                }
            </div>
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