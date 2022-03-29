import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { handelGetAllBooking, handelDeleteBooking, handleVerifyBookingCancle, handleVerifyBookingFromOwner, getBookingByUserId } from '../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';

class BookingTable extends Component {

    constructor(props) {
        super(props);
        this.state = {

            listBookings: [],
            name: '',
            userId: '',
            houseId: '',
            time: '',
            date: '',
            desc: '',
            action: CRUD_ACTIONS.CREATE,
            idBookingEdit: ''
        }
    }

    async componentDidMount() {
        let res = await handelGetAllBooking('ALL');
        let { userInfo } = this.props;
        if (res && res.data && userInfo.roleId === 1) {
            this.setState({
                listBookings: res.data
            })
        }

        let response = await getBookingByUserId(this.props.userInfo.id);
        console.log(response.bookings);
        this.setState({
            listBookings: response.bookings

        })


    }
    componentDidUpdate(prevProps, prevState, snapsot) {


    }
    changeMillisecondIntoUTC = (str) => {
        str = parseInt(str);
        let dateURTC = new Date(str);
        let datePicker = [];
        datePicker[0] = dateURTC;
        datePicker[1] = dateURTC;
        console.log(typeof datePicker, datePicker);
        return datePicker;
    }
    handleEditStatus = () => {
        this.setState({

        })
    }

    handleEditBooking = (booking) => {
        this.props.handleActionBooking(CRUD_ACTIONS.EDIT);

        let date = parseInt(booking.date);
        let datePicker = this.changeMillisecondIntoUTC(date);
        this.props.handleEditBookingFromParent(booking, datePicker);


    }
    handleDeleteBooking = async (id) => {
        let res = await handelDeleteBooking(id);
        this.setState({
            listBookings: this.state.listBookings
        })
    }
    changeMillisecondInto = (str) => {
        str = parseInt(str);
        let dateURTC = moment(new Date(str)).format('DD/MM/YYYY');
        return dateURTC;
    }
    handleAceptBooking = async (item) => {
        let res = await handleVerifyBookingFromOwner({
            token: item.token,
            idBooking: item.idHouse
        })
        window.location.reload();

    }
    handleCancelBooking = async (item) => {
        let res = await handleVerifyBookingCancle({
            token: item.token,
            idBooking: item.idHouse
        })
        window.location.reload();

    }
    render() {
        let bookings = this.state.listBookings;
        return (
            <div className='col-12 mb5'>
                <table className="TableManage">
                    <tr>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Date</th>

                        <th>Email user booking</th>

                        <th>Action</th>
                        <th>Deny or Accept</th>

                    </tr>
                    {bookings && bookings.length > 0 &&
                        bookings.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td>{item.time}</td>
                                    <td>{item.status}</td>
                                    <td>{this.changeMillisecondInto(item.date)}</td>
                                    <td>{item.User.email}</td>
                                    <td>
                                        <button
                                            className='btn-edit'
                                            onClick={() => this.handleEditBooking(item)}
                                        >
                                            <i className="fas fa-edit"></i> </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteBooking(item.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i></button>
                                    </td>
                                    <td>
                                        <button
                                            className='btn-edit'
                                            onClick={() => this.handleAceptBooking(item)}
                                        >
                                            Nhận </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleCancelBooking(item)}
                                        >
                                            Hủy</button>


                                    </td>


                                </tr>




                            )
                        })
                    }

                </table >



            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
