import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHouse.scss'
import { getHouseServiceById, getAllUser, handleGetInfoBooking, handlePostComment, handelGetAllCommentByHouseId } from '../../../services/userService';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Schedule from './Schedule';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HomeFooter from '../../HomePage/HomeFooter';
import { handleVerifyBooking } from '../../../services/userService'
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    async componentDidMount() {
        console.log(this.props);

        if (this.props.location && this.props.location.search) {
            let urlparam = new URLSearchParams(this.props.location.search);
            let token = urlparam.get('token');
            let booking = urlparam.get('bookingId');
            console.log(typeof booking, typeof token);
            let res = await handleVerifyBooking({
                token: token,
                idBooking: booking
            })
            console.log(res);
        };




    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }




    render() {



        return (
            <React.Fragment>
                <p>VerifyEmail Success</p>


            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
