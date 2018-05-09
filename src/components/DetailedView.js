import React from 'react'
import { connect } from 'react-redux'
import  { getDetailsApi }from '../actions/beersApi'
import {history} from '../routers/AppRouter';
import Modal from 'react-modal';
import { HashLoader } from 'react-spinners';


class ListingView extends React.Component {
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
       // console.log(this.props);
        this.props.getDetailsApi(this.props.match.params.id);
    }

    render() {
        return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Beer modal"
                    ariaHideApp={false}
                >
                    <button onClick={this.closeModal}>close</button>
                    {
                        !this.props.beers.getting  ?
                            this.props.beers.beer !== null && this.props.beers.beerExists?
                                <div>
                                    <h1 key={this.props.beers.beer[0].id}>{this.props.beers.beer[0].name}</h1>
                                    <p>{this.props.beers.beer[0].tagline}</p>
                                    <p>{this.props.beers.beer[0].description}</p>
                                    <img src={this.props.beers.beer[0].image_url} width="40" height="150"/>
                                    <p>{this.props.beers.beer[0].brewer_tips}</p>
                                    <p>IBU: {this.props.beers.beer[0].ibu}</p>
                                    <p>ABV: {this.props.beers.beer[0].abv}</p>
                                    <p>EBC: {this.props.beers.beer[0].ebc}</p>
                                </div>
                                :
                                <p>Beer with id: {this.props.match.params.id} doesn't exists.</p>
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
)(ListingView)