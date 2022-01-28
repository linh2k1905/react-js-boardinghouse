import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };

        return (

            <div
                className='home-footer'
            >
                <p>&copy; 2022 Truong Thao Linh </p>
                <p> Website Hỗ trợ Tìm trọ TimPhongTro123 Xem Video review <a href='https://www.youtube.com/channel/UCiezM6-7GCQGPDJ2SAZNA4A'
                    target='_blank'>tại đây</a></p>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languaguage: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
