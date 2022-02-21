import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils'
class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeHouselist: []

        }
    }

    async componentDidMount() {


        this.props.getTypeHouseStart();
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.typeHouseRedux != this.props.typeHouseRedux) {
            this.setState({
                typeHouselist: this.props.typeHouseRedux
            })
        }


    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };
        let typeHouseArray = this.state.typeHouselist;
        return (
            <div className='Section-section'>
                <div className='Section-container'>
                    <div className='Section-header'>
                        <span className='title-section'>Lựa chọn loại nhà </span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='Section-body'>
                        <Slider {...settings}>
                            {typeHouseArray && typeHouseArray.length > 0 && typeHouseArray.map((item, index) => {

                                return (
                                    <div className='Section-customize'>
                                        <div className='img-customize'

                                        ></div>
                                        <div className='type-house-name'>

                                            {this.props.language == LANGUAGES.VI ? item.nameVi : item.name}
                                        </div>
                                    </div>)
                            })}




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
        languaguage: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
