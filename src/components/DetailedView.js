import React from 'react'
import {connect} from 'react-redux'
import {getDetailsApi} from '../actions/beersApi'
import {history} from '../routers/AppRouter';
import Modal from 'react-responsive-modal';
import {HashLoader} from 'react-spinners';
import SimilarBeers from './SimilarBeers';
import {Flex, Box} from 'reflexbox'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FaExternalLink from 'react-icons/lib/fa/external-link';

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
                <Modal open={this.state.modalIsOpen} onClose={this.closeModal} center>


                    {/*<button onClick={this.closeModal}>close</button>*/}
                    {
                        !this.props.beers.getting ?
                            this.props.beers.beer !== null && this.props.beers.beerExists ?
                                <div>
                                    <Flex wrap align='center' w={1} p={0}>
                                        <Box w={1} p={0}>
                                            <h1 className="detailedview__main_beer" key={this.props.beers.beer[0].id}>
                                                {this.props.beers.beer[0].name}
                                                <CopyToClipboard
                                                    text={window.location.href}
                                                    onCopy={() =>  {
                                                        this.setState({copied: true });
                                                        setTimeout(function(){this.setState({copied: false})}.bind(this),3000) }
                                                    }
                                                >
                                                    <FaExternalLink className="detailedview__copy_link"/>
                                                </CopyToClipboard>
                                            </h1>
                                            <h2 className="detailedview__main_tagline">{this.props.beers.beer[0].tagline}
                                                {this.state.copied ?
                                                    <span className="detailedview__copy_link detailedview__copy_text"> Link to beer copied.</span> : null}
                                            </h2>
                                        </Box>


                                        <Box w={1 / 3} p={0}>
                                            <div align="center">
                                                <img src={this.props.beers.beer[0].image_url}
                                                     className="detailedview__image similarView__border" alt=""/>
                                            </div>
                                        </Box>
                                        <Box w={2 / 3} p={0}>
                                            <p className="detailedview__text"><strong>About this beer:</strong></p>
                                            <p className="detailedview__text">{this.props.beers.beer[0].description}</p>
                                        </Box>
                                        <Box w={1 / 3} p={0}>
                                            <div align="center">
                                                <p className="detailedview__text">
                                                    <strong>IBU:</strong> {this.props.beers.beer[0].ibu}</p>
                                                <p className="detailedview__text">
                                                    <strong> EBC:</strong> {this.props.beers.beer[0].ebc}</p>
                                                <p className="detailedview__text">
                                                    <strong> ABV:</strong> {this.props.beers.beer[0].abv}%</p>
                                            </div>
                                        </Box>
                                        <Box w={2 / 3} p={0}>
                                            <p className="detailedview__text"><strong>Brewers tips:</strong></p>
                                            <p className="detailedview__text">{this.props.beers.beer[0].brewers_tips}</p>
                                        </Box>


                                        <Box w={1} p={0}>
                                            <p className="detailedview__text"><strong>You may also like:</strong></p>
                                            <SimilarBeers
                                                similarIbu={this.props.beers.beer[0].ibu}
                                                similarEbc={this.props.beers.beer[0].ebc}
                                                similarAbv={this.props.beers.beer[0].abv}
                                            />
                                        </Box>
                                    </Flex>
                                    {/*<Box w={1} p={0}>*/}

                                    {/*</Box>*/}


                                    {/*<Box w={1/3} p={1}>*/}
                                    {/*</Box>*/}
                                    {/*<Box w={2/3} p={1}>*/}

                                    {/*</Box>*/}

                                    {/*<Box p={0} w={1} h={900}>*/}

                                    {/*</Box>*/}


                                    {/*</Flex>*/}


                                </div>
                                :
                                this.props.beers.error ?
                                    <Box w={1} p={3}>
                                        <p>Check your internet connection</p>
                                    </Box>
                                    : <Box w={1} p={3}>
                                        <p>Couldn't grab a beer with ID: {this.props.match.params.id}. Request limit reached
                                            or beer doesn't exists.</p>
                                    </Box>
                            :
                            this.props.match.params.beerName
                                ? <Box w={1} p={3}>
                                    <h1 className="detailedview__main_beer">{this.props.match.params.beerName}</h1>
                                    <h2>Grabbing information...</h2>
                                    <HashLoader
                                        color={'FF2F2F'}
                                    />
                                </Box>
                                : <Box w={1} p={3}>
                                    <h2>Grabbing a beer...</h2>
                                    <HashLoader
                                        color={'FF2F2F'}
                                    />
                                </Box>
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