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
import ModalPost from './ModalPost';
import { searchHouseByUserService, searchHouseByTypeHouse } from '../../services/userService';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router'
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalArea: false,
            isOpenModalPrice: false,
            typeHouse: [],
            citiesSelected: {},
            roomSelected: {},
            areaValue: '',
            priceValue: '',
            isSearch: false,
            isOpenFinder: false,
            isOpenModalPost: false


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
    toggleModalPost = () => {

        this.setState({
            isOpenModalPost: !this.state.isOpenModalPost
        })
    }

    componentDidMount() {
        this.props.getTypeHouseStart();


    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.typeHouses != this.props.typeHouses) {
            this.setState({
                typeHouse: this.props.typeHouses,

            })
        }
        if (prevProps.isOpenFinder != this.props.isOpenFinder) {
            this.setState({
                isOpenFinder: this.props.isOpenFinder

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

        this.setState({
            areaValue: value

        })
    }
    selectPrice = (value) => {

        this.setState({
            priceValue: value

        })
    }

    searchHouseByUser = async () => {
        this.props.isSearchCheck(true);

        let { priceValue, areaValue, citiesSelected, roomSelected } = this.state;
        let obj = {};
        obj.idCity = citiesSelected.id;
        obj.idTypeHouse = roomSelected.id;
        obj.area = areaValue;
        obj.price = priceValue;


        if (priceValue && areaValue && citiesSelected && roomSelected) {

            let res = await searchHouseByUserService(obj);
            this.props.listHouseFilerFunction(res.data);
            console.log(res.data);

        }
    }
    handleSelectByTypeHouse = async (id) => {


        this.props.history.push(`/detail-type-house/${id}`);
    }
    handleClickBackHome = () => {
        this.props.history.push('/home');

    }
    handleClickToLogin = () => {
        this.props.history.push('/login');

    }
    handleClickPost = () => {
        this.setState({
            isOpenModalPost: true
        })
    }
    render() {
        let { language, isOpenFinder, isLoggedIn, userInfo, processLogout } = this.props;
        console.log(userInfo);

        let { typeHouse, citiesSelected, roomSelected, areaValue, priceValue } = this.state;
        return (

            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>

                            <div className='header-logo'
                                onClick={() => this.handleClickBackHome()}
                            >
                                TimPhongTro.com
                            </div>
                        </div>
                        <div className='center-content'>

                        </div>
                        <div className='right-content'>
                            <div className='welcome-text'><FormattedMessage id="header.welcome" /> TimPhongTro </div>

                            {isLoggedIn && userInfo ?
                                <div className='user-info'>
                                    {userInfo.firstName && userInfo.lastName ? "Hello, " + userInfo.firstName + " " + userInfo.lastName : userInfo.email}

                                </div> :
                                <>
                                    <div className='child-right-content'
                                        onClick={() => this.handleClickToLogin()}
                                    >
                                        <a><FormattedMessage id="login.login" /></a>
                                    </div>
                                    <div className='child-right-content'>

                                        <a ><FormattedMessage id="header.signup" /></a>
                                    </div>
                                </>
                            }

                            <div

                                className='child-right-content btn-post'
                                onClick={() => this.handleClickPost()}
                            >
                                <a><FormattedMessage id="header.post" /> <i className="fas fa-plus-circle"></i> </a>
                            </div>
                            <div className='language'>
                                <div onClick={() => { this.changeLanguage(LANGUAGES.EN) }} className={this.props.language === LANGUAGES.EN ? 'language-en action' : 'language-en'}><span >EN</span></div>
                                <div onClick={() => { this.changeLanguage(LANGUAGES.VI) }} className={this.props.language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'}><span >VI</span></div>

                            </div>
                            <ModalPost
                                isOpen={this.state.isOpenModalPost}
                                toggleModalPost={this.toggleModalPost}
                            />
                            {userInfo &&
                                <div className="btn btn-logout" onClick={processLogout}>
                                    {language === LANGUAGES.VI ? 'THOÁT' : 'EXIT'}
                                </div>
                            }

                        </div>
                    </div>

                </div>
                <div className='homepage-container-banner'>
                    <div className='homepage-banner-header'>

                        {typeHouse && typeHouse.length > 0 &&
                            typeHouse.map((item, index) => {
                                return (

                                    <div className='banner-child'
                                        onClick={() => this.handleSelectByTypeHouse(item.id)}
                                    >
                                        {
                                            language === LANGUAGES.VI ? item.nameVi : item.name}
                                    </div>
                                )

                            })}



                    </div>
                </div>
                {isOpenFinder &&


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
        userInfo: state.user.userInfo,
        language: state.app.language,
        typeHouses: state.admin.typeHouses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
