import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { language } from '../../../utils';
import * as actions from '../../../store/actions';
class Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOwner: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.ownerRedux != this.props.ownerRedux) {
            this.setState({
                arrOwner: this.props.ownerRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopOwner()
    }
    render() {
        let arrOwner = this.state.arrOwner;
        let { language } = this.props

        return (
            <div className='Owner-Owner'>
                <div className='Owner-container'>
                    <div className='Owner-header'>
                        <span className='title-owner'>Chủ trọ uy tín</span>

                    </div>
                    <div className='Owner-body'>

                        {arrOwner && arrOwner.length > 0
                            && arrOwner.map((item, index) => {
                                console.log(arrOwner);
                                let imagebase64 = '';
                                if (item.image) {
                                    imagebase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='Owner-customize'>
                                        <div className='img-customize image-avatar'
                                            style={{ backgroundImage: `url(${imagebase64})` }}
                                        ></div>
                                        <div>{nameEn}</div>
                                    </div>
                                )
                            })

                        }





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
        ownerRedux: state.admin.owner

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopOwner: () => dispatch(

            actions.fetchOwner()
        )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
