import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { handelGetAllBooking, handelDeleteBooking } from '../../../services/userService'
import { toast } from 'react-toastify';
let rangeTime = [{ value: "7am-8am", isSelect: false },
{ value: "8am-9am", isSelect: false },
{ value: "9am-10am", isSelect: false },
{ value: "10am-11am", isSelect: false },
{ value: "11am-12am", isSelect: false },
{ value: "1pm-2pm", isSelect: false },
{ value: "2pm-3pm", isSelect: false },
{ value: "3pm-4pm", isSelect: false },
{ value: "4pm-5pm", isSelect: false },
];
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
        console.log(res);
        if (res && res.data) {
            this.setState({
                listBookings: res.data
            })
        }


    }
    async componentDidUpdate(prevProps, prevState, snapsot) {
        let res = await handelGetAllBooking('ALL');
        if (res.data != this.state.listBookings) {


            if (res && res.data) {
                this.setState({
                    listBookings: res.data
                })
            }

        }

    }

    handleEditBooking = (booking) => {


    }
    handleDeleteBooking = async (id) => {
        let res = await handelDeleteBooking(id);
        this.setState({
            listBookings: this.state.listBookings
        })
    }

    render() {
        let bookings = this.state.listBookings;
        return (
            <div className='col-12 mb5'>
                <table className="TableManage">
                    <tr>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Name House</th>
                        <th>Email user booking</th>

                        <th>Action</th>

                    </tr>
                    {bookings && bookings.length > 0 &&
                        bookings.map((item, index) => {
                            return (




                                <tr key={index}>

                                    <td>{item.time}</td>
                                    <td>{item.date}</td>
                                    <td>{item.House.name}</td>
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


                                </tr>




                            )
                        })
                    }

                </table>



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




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTable);
