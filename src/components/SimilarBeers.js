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
                                    <Link key={i} to={"/beer/" + beer.id + "/" + beer.name}>
                                        <div className="flipper">
                                            <div className="front">
                                                <img src={beer.image_url} width="10" height="37" alt=""/>
                                                <h4>{beer.name}</h4>
                                            </div>
                                            <div className="back">
                                                <p><strong>IBU:</strong>{beer.ibu}</p>
                                                <p><strong>ABV:</strong>{beer.abv}</p>
                                                <p><strong>EBC:</strong>{beer.ebc}</p>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </Link>
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