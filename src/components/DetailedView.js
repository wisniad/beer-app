import React from 'react'
import {connect} from 'react-redux'
import {getDetailsApi} from '../actions/beersApi'
import {history} from '../routers/AppRouter';
import Modal from 'react-responsive-modal';
import {HashLoader} from 'react-spinners';
import SimilarBeers from './SimilarBeers';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

class DetailedView extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: true,
            getting: false,
            beer: null,
            beerExists: false,
            copied: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        history.push('/');
    }

    componentDidMount() {
        this.props.getDetailsApi(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getDetailsApi(nextProps.match.params.id);
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Modal
                    open={this.state.modalIsOpen} onClose={this.closeModal} center
                >
                    {
                        !this.props.beers.getting ?
                            this.props.beers.beer !== null && this.props.beers.beerExists ?
                                <div className="modal-content">
                                    <Grid container spacing={0} direction="column" align="left" >
                                        <Grid item xs={12}>
                                            <h1 className="detailedview__main_beer" key={this.props.beers.beer[0].id}>
                                                {this.props.beers.beer[0].name}
                                                <CopyToClipboard
                                                    text={window.location.href}
                                                    onCopy={() => {
                                                        this.setState({copied: true});
                                                        setTimeout(function () {
                                                            this.setState({copied: false})
                                                        }.bind(this), 3000)
                                                    }
                                                    }
                                                >
                                                    <FaExternalLink className="detailedview__copy_link"/>
                                                </CopyToClipboard>
                                                {this.state.copied ?
                                                    <span className="detailedview__copy_link detailedview__copy_text"> Link to beer copied.</span> : null}
                                            </h1>
                                            <h2 className="detailedview__main_tagline">{this.props.beers.beer[0].tagline}</h2>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={24} direction="row" align="center" >
                                                <Grid item xs={4}>
                                                    <div align="center">
                                                        <img src={this.props.beers.beer[0].image_url}
                                                             className="detailedview__image_main" alt=""/>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <h2 className="detailedview__text"><strong>About this beer:</strong></h2>
                                                    <p className="detailedview__text">{this.props.beers.beer[0].description}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0} direction="row" align="center" >
                                                <Grid item xs={4}>
                                                    <div align="center">
                                                        <h2 className="detailedview__text"><strong>Beer info:</strong></h2>
                                                        <p className="detailedview__text">
                                                            <strong>IBU:</strong> {this.props.beers.beer[0].ibu}</p>
                                                        <p className="detailedview__text">
                                                            <strong> EBC:</strong> {this.props.beers.beer[0].ebc}</p>
                                                        <p className="detailedview__text">
                                                            <strong> ABV:</strong> {this.props.beers.beer[0].abv}%</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <h2 className="detailedview__text"><strong>Brewers tips:</strong></h2>
                                                    <p className="detailedview__text">{this.props.beers.beer[0].brewers_tips}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} className="detailedview__staticHeight">
                                            <h2 className="detailedview__text detailedview__simliarPadding"><strong>You may also like:</strong></h2>
                                            <SimilarBeers
                                                similarIbu={this.props.beers.beer[0].ibu}
                                                similarEbc={this.props.beers.beer[0].ebc}
                                                similarAbv={this.props.beers.beer[0].abv}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                :
                                this.props.beers.error ?
                                    <Grid item xs={12}>
                                        <p>Check your internet connection</p>
                                    </Grid>
                                    : <Grid item xs={12}>
                                        <p>Couldn't grab a beer with ID: {this.props.match.params.id}. Request limit reached
                                            or beer doesn't exists.</p>
                                    </Grid>
                            :
                            this.props.match.params.beerName
                                ? <Grid item xs={12}>
                                    <h1 className="detailedview__main_beer">{this.props.match.params.beerName}</h1>
                                    <h2>Grabbing information...</h2>
                                    <HashLoader
                                        color={'FF2F2F'}
                                    />
                                </Grid>
                                : <Grid item xs={12}>
                                    <h2>Grabbing a beer...</h2>
                                    <HashLoader
                                        color={'FF2F2F'}
                                    />
                                </Grid>
                    }
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    beers: state.beers,
    details: state.details,
    beerExists: state.beerExists
});

const mapDispatchToProps = dispatch => ({
    getDetailsApi: (beerId) => dispatch(getDetailsApi(beerId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailedView)