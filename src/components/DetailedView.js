import React from 'react'
import {connect} from 'react-redux'
import {getDetailsApi} from '../actions/beersApi'
import {history} from '../routers/AppRouter';
import Modal from 'react-modal';
import {HashLoader} from 'react-spinners';
import SimilarBeers from './SimilarBeers';
import {Flex, Box} from 'reflexbox'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class DetailedView extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: true,
            getting: false,
            beer: null,
            beerExists: false
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
            this.props.getDetailsApi(this.props.match.params.id);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Beer modal"
                ariaHideApp={false}
                style={customStyles}
            >
                <button onClick={this.closeModal}>close</button>
                {
                    !this.props.beers.getting ?
                        this.props.beers.beer !== null && this.props.beers.beerExists ?
                            <div>
                                <h1 key={this.props.beers.beer[0].id}>{this.props.beers.beer[0].name}</h1>
                                <p>{this.props.beers.beer[0].tagline}</p>
                                <p>{this.props.beers.beer[0].description}</p>
                                <img src={this.props.beers.beer[0].image_url} width="40" height="150" alt=""/>
                                <p>{this.props.beers.beer[0].brewer_tips}</p>
                                <p>IBU: {this.props.beers.beer[0].ibu},
                                    EBC: {this.props.beers.beer[0].ebc},
                                    ABV: {this.props.beers.beer[0].abv}
                                </p>

                                <SimilarBeers
                                    similarIbu={this.props.beers.beer[0].ibu}
                                    similarEbc={this.props.beers.beer[0].ebc}
                                    similarAbv={this.props.beers.beer[0].abv}
                                />
                            </div>
                            :
                            this.props.beers.error ?
                                <p>Check your internet connection</p>
                                : <p>Couldn't grab a beer with ID: {this.props.match.params.id}.</p>
                        :
                        this.props.match.params.beerName
                            ? <div>
                                <h1>{this.props.match.params.beerName}</h1>
                                <p>Grabbing information...</p>
                                <HashLoader
                                    color={'FF2F2F'}
                                />
                            </div>
                            : <div>
                                <p>Grabbing a beer...</p>
                                <HashLoader
                                    color={'FF2F2F'}
                                />
                            </div>
                }

            </Modal>
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