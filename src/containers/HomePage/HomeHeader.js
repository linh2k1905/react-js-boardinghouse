import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import DropDownCity from './DropDownCity.js';
import DropdownRoom from './DropDownRoom.js';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import ModalArea from './ModalArea.js';
import ModalPrice from './ModalPrice';
import { getTypeHouseService } from '../../services/userService';
import * as actions from '../../store/actions';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalArea: false,
            isOpenModalPrice: false,
            typeHouse: [],
            citiesSelected: '',
            roomSelected: '',
            areaValue: '',
            priceValue: ''


        };


    }
    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }
    // area
    handleClickArea = () => {
        this.setState({
            isOpenModalArea: true
        })
    }

    toggleModalArea = () => {
        this.setState({
            isOpenModalArea: !this.state.isOpenModalArea
        })

    }

    // PRICE
    handleClickPrice = () => {
        this.setState({
            isOpenModalPrice: true
        })
    }

    toggleModalPrice = () => {
        this.setState({
            isOpenModalPrice: !this.state.isOpenModalPrice
        })

    }

    componentDidMount() {
        this.props.getTypeHouseStart();


    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.typeHouses != this.props.typeHouses) {
            this.setState({
                typeHouse: this.props.typeHouses
            })
        }


    }
    onClickSelectedCity = (city) => {
        this.setState({
            citiesSelected: city
        })

    }
    selectedRoom = (room) => {
        this.setState({
            roomSelected: room
        })


    }
    selectArea = (value) => {
        console.log(value);
        this.setState({
            areaValue: value

        })
    }
    selectPrice = (value) => {
        console.log(value);
        this.setState({
            priceValue: value

        })
    }

    searchHouseByUser = () => {
        let { priceValue, areaValue, citiesSelected, roomSelected } = this.state;
        if (priceValue && areaValue && citiesSelected && roomSelected) {
            console.log(this.state);
        }
    }
    render() {
        let { language } = this.props;
        let { typeHouse, citiesSelected, roomSelected, areaValue, priceValue } = this.state;
        return (

            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>

                            <div className='header-logo'>
                                TimPhongTro.com
                            </div>
                        </div>
                        <div className='center-content'>

                        </div>
                        <div className='right-content'>
                            <div className='welcome-text'><FormattedMessage id="header.welcome" /> TimPhongTro </div>
                            <div className='child-right-content'>

                                <a ><FormattedMessage id="header.signup" /></a>
                            </div>
                            <div className='child-right-content'>
                                <a><FormattedMessage id="login.login" /></a>
                            </div>
                            <div className='child-right-content btn-post'>
                                <a><FormattedMessage id="header.post" /> <i className="fas fa-plus-circle"></i> </a>
                            </div>
                            <div className='language'>
                                <div onClick={() => { this.changeLanguage(LANGUAGES.EN) }} className={this.props.language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span >EN</span></div>
                                <div onClick={() => { this.changeLanguage(LANGUAGES.VI) }} className={this.props.language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span >VI</span></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='homepage-container-banner'>
                    <div className='homepage-banner-header'>

                        {typeHouse && typeHouse.length > 0 &&
                            typeHouse.map((item, index) => {
                                return (

                                    <div className='banner-child'>
                                        {
                                            language === LANGUAGES.VI ? item.nameVi : item.name}
                                    </div>
                                )

                            })}



                    </div>
                </div>
                {


                    <div className='home-filter-header'>
                        <div className='child-filter-header'>

                            <DropDownCity
                                selectedCity={this.onClickSelectedCity}
                            />


                        </div>
                        <div className='child-filter-header'>
                            <DropdownRoom
                                selectedRoom={this.selectedRoom} />
                        </div>
                        <div className='child-filter-header'>
                            <button
                                className='btn-modal'
                                onClick={() => this.handleClickPrice()}
                            >
                                {priceValue ? `${priceValue} Triệu(VND) ` : <FormattedMessage id="header.price" />}

                            </button>
                            <div className="modal-users-container">
                                <ModalPrice
                                    isOpen={this.state.isOpenModalPrice}
                                    toggleModalPrice={this.toggleModalPrice}
                                    selectPrice={this.selectPrice}


                                />
                            </div>
                        </div>

                        <div className='child-filter-header'>
                            <button
                                onClick={() => this.handleClickArea()}
                                className='btn-modal'
                            >
                                {areaValue ? `${areaValue} M2 ` : <FormattedMessage id="header.area" />}

                            </button>

                            <ModalArea
                                isOpen={this.state.isOpenModalArea}
                                toggleModalArea={this.toggleModalArea}
                                selectArea={this.selectArea}

                            />
                        </div>
                        <div className='child-filter-header'>
                            <button

                                className='btn-filter-header'
                                onClick={this.searchHouseByUser}
                            >
                                <FormattedMessage id="header.find" />
                                <i className="fas fa-search"></i></button>
                        </div>
                    </div>

                }

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        typeHouses: state.admin.typeHouses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
