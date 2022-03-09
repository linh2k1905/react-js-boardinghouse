import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { language, path } from '../../../utils';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
class HouseListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHouseArr: []

        }
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (this.props.listHouseFilers != prevProps.listHouseFilers) {

            this.setState({
                listHouseArr: this.props.listHouseFilers
            })
        }



    }
    componentDidMount() {
        if (this.props.listHouseFilers && this.props.listHouseFilers.length > 0) {
            this.setState({
                listHouseArr: this.props.listHouseFilers
            })
        }



    }
    handleShowDetailHouse(item) {

        this.props.history.push(`/detail-house/${item.id}`)

    }
    render() {
        let { listHouseArr } = this.state;


        return (
            <div className='Owner-Owner'>
                <div className='Owner-container-left'>
                    {listHouseArr && listHouseArr.map((item, index) => {
                        let imagebase64 = '';
                        if (item.image) {
                            imagebase64 = new Buffer(item.image, 'base64').toString('binary');


                        }
                        return (
                            <div className='Owner-body'

                                onClick={() => this.handleShowDetailHouse(item)}>
                                <div className='Owner-customize'>

                                    <div className='img-customize image-house'
                                        style={{ backgroundImage: `url(${imagebase64})` }}
                                    ></div>
                                    <div
                                        className='contain-info-house'
                                    >
                                        <div className='name-house'>  {item.name}</div>
                                        <div
                                            className='address-house'>
                                            <FormattedMessage id='system.user-manage.address'
                                            />: {item.address}
                                        </div>
                                        <div
                                            className='price-house'>
                                            <FormattedMessage id='system.post-manage.price'
                                            />: {item.price}

                                        </div>
                                        <div
                                            className='area-house'>
                                            <FormattedMessage id='system.post-manage.area'
                                            />: {item.area} m2

                                        </div>
                                        <div
                                            className='area-house'>
                                            <FormattedMessage id='system.post-manage.descEn'
                                            />: {item.descriptionEn}

                                        </div>
                                        <div
                                            className='area-house'>
                                            <FormattedMessage id='system.post-manage.descVi'
                                            />: {item.descriptionVi}

                                        </div>
                                        <div
                                            className='area-house'>
                                            <FormattedMessage id='system.user-manage.mobile'
                                            />: {item.User.tel}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {


    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopHouse: () => dispatch(


        )



    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HouseListFilter));
