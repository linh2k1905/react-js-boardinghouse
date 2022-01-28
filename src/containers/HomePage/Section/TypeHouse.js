import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


class Section extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };

        return (
            <div className='Section-section'>
                <div className='Section-container'>
                    <div className='Section-header'>
                        <span className='title-section'>Loại nhà được yêu thích</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='Section-body'>
                        <Slider {...settings}>

                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 1</div>
                            </div>
                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 2</div>
                            </div>
                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 3</div>
                            </div>
                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 4</div>
                            </div>
                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 5</div>
                            </div>
                            <div className='Section-customize'>
                                <div className='img-customize'></div>
                                <div>Nha tro 6</div>
                            </div>


                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
