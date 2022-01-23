import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import DropDownCity from './DropDownCity.js';
import DropdownRoom from './DropDownRoom.js';
import DropdownPrice from './DropdownPrice.js';
import AreaSelect from './AreaSelect.js';
class HomeHeader extends Component {

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
                            <div className='welcome-text'>TimPhongTro xin chào quý khách!!!</div>
                            <div className='child-right-content'>

                                <a >Đăng kí</a>
                            </div>
                            <div className='child-right-content'>
                                <a>Đăng nhập</a>
                            </div>
                            <div className='child-right-content btn-post'>
                                <a>Đăng bài <i className="fas fa-plus-circle"></i> </a>
                            </div>

                            <i className="fas fa-question-circle"></i>Hỗ trợ

                        </div>
                    </div>

                </div>
                <div className='homepage-banner-header'>
                    <div className='banner-child'>
                        Trang chủ
                    </div>
                    <div className='banner-child'>
                        Thuê phòng trọ
                    </div>
                    <div className='banner-child'>
                        Thuê căn hộ
                    </div>
                    <div className='banner-child'>
                        Thuê mặt bằng
                    </div>
                    <div className='banner-child'>
                        Nhà cho thuê
                    </div>
                </div>
                <div className='home-filter-header'>
                    <div className='child-filter-header'>

                        <DropDownCity />


                    </div>
                    <div className='child-filter-header'>
                        <DropdownRoom />
                    </div>
                    <div className='child-filter-header'>
                        <AreaSelect />
                    </div>
                    <div className='child-filter-header'>
                        <DropdownPrice />
                    </div>
                    <div className='child-filter-header'>
                        <button className='btn-filter-header'>Tìm kiếm
                            <i className="fas fa-search"></i></button>
                    </div>
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
