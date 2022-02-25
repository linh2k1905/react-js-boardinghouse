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

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalArea: false,
            isOpenModalPrice: false


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
    render() {


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
                        <div className='banner-child'>
                            <FormattedMessage id="header.home" />
                        </div>

                        <div className='banner-child'>
                            <FormattedMessage id="header.room" />
                        </div>
                        <div className='banner-child'>
                            <FormattedMessage id="header.house" />
                        </div>
                        <div className='banner-child'>
                            <FormattedMessage id="header.flat" />
                        </div>
                        <div className='banner-child'>
                            <FormattedMessage id="header.apartment" />
                        </div>
                    </div>
                </div>
                {
                    this.props.isOpenFider === true &&


                    <div className='home-filter-header'>
                        <div className='child-filter-header'>

                            <DropDownCity />


                        </div>
                        <div className='child-filter-header'>
                            <DropdownRoom />
                        </div>
                        <div className='child-filter-header'>
                            <button
                                className='btn-modal'
                                onClick={() => this.handleClickPrice()}
                            >
                                <FormattedMessage id="header.price" />
                            </button>
                            <div className="modal-users-container">
                                <ModalPrice
                                    isOpen={this.state.isOpenModalPrice}
                                    toggleModalPrice={this.toggleModalPrice}


                                />
                            </div>
                        </div>

                        <div className='child-filter-header'>
                            <button
                                onClick={() => this.handleClickArea()}
                                className='btn-modal'
                            ><FormattedMessage
                                    id="header.area" />
                            </button>

                            <ModalArea
                                isOpen={this.state.isOpenModalArea}
                                toggleModalArea={this.toggleModalArea}

                            />
                        </div>
                        <div className='child-filter-header'>
                            <button className='btn-filter-header'><FormattedMessage id="header.find" />
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
