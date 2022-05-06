import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import BookingTable from './BookingTable';
import Select from 'react-select';
import { handlePostBooking, handlePostBookingWithoutPassword, editBooKingService, getHouseByEmailUser, getHouseServiceById } from '../../../services/userService';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi';
import { USER_ROLE } from '../../../utils';
import DatePicker from "../../../components/Input/DatePicker";
const rangeTime = [{ value: "7am-8am", isSelect: false },
{ value: "8am-9am", isSelect: false },
{ value: "9am-10am", isSelect: false },
{ value: "10am-11am", isSelect: false },
{ value: "11am-12am", isSelect: false },
{ value: "1pm-2pm", isSelect: false },
{ value: "2pm-3pm", isSelect: false },
{ value: "3pm-4pm", isSelect: false },
{ value: "4pm-5pm", isSelect: false },
];
class PostManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listHouse: [],
            listUser: [],
            userList: [],
            email: '',
            houseSelected: '',
            desc: '',
            time: '',
            action: CRUD_ACTIONS.CREATE,
            currentDate: '',

            datePickerEdit: [],
            datePicker: [],
            editBookingId: '',
            date: []


        }
    }

    async componentDidMount() {
        this.props.getUser(USER_ROLE.USER);
        if (this.props.userInfo && this.props.userInfo.roleId === USER_ROLE.ADMIN) {
            this.props.getAllPost();
            this.setState({
                listHouse: this.buidDataSelectHouse(this.props.postRedux),
            })
        }

        if (this.props.userInfo && this.props.userInfo.roleId === USER_ROLE.OWNER) {
            let res = await getHouseByEmailUser(this.props.userInfo.email);
            this.setState({
                listHouse: this.buidDataSelectHouse(res.houses)
            })
        }


        this.setState({
            listUser: this.buidDataSelect(this.props.userRedux),
            userList: this.props.postRedux
        })







    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.userRedux != this.props.userRedux) {
            this.setState({

                listUser: this.buidDataSelect(this.props.userRedux),
            })

        }
        if (prevProps.postRedux != this.props.postRedux) {
            this.setState({
                listHouse: this.buidDataSelectHouse(this.props.postRedux),
            })

        }




    }
    handleChangeDatePicker = (date) => {

        this.setState({
            currentDate: date[0],
        })

    }
    checkValidInput = () => {
        let isValid = true;
        let arrCheck = ['time', 'currentDate', 'email', 'houseSelected', 'desc'

        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This required ' + arrCheck[i]);
                break;
            }
        }
        return isValid;

    }




    onChangeInput = (event, inputId) => {

        let copyState = { ...this.state };
        copyState[inputId] = event.target.value;
        this.setState({
            ...copyState

        })




    }


    buidDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.email;
                obj.label = `${item.email}`
                result.push(obj);
            })

        }
        return result;

    }
    buidDataSelectHouse = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = `${item.name}` + " " + `${item.address}`
                result.push(obj);
            })

        }
        return result;

    }
    handleOnChange = async (selectedOption) => {

        this.setState({
            email: selectedOption
        })


    }
    handleOnChangeHouse = (option) => {
        this.setState({
            houseSelected: option
        })
    }
    handleSaveBooking = async () => {
        let check = this.checkValidInput();
        let { desc, time, email, houseSelected, currentDate, action, editBookingId } = this.state;
        if (check) {
            if (action === CRUD_ACTIONS.CREATE) {
                let formatDate = new Date(currentDate).getTime().toString();
                let houseChoosen = await getHouseServiceById(houseSelected.value);
                console.log(houseChoosen);
                let res = await handlePostBookingWithoutPassword({
                    email: email.value,
                    desc: desc,
                    time: time,
                    idHouse: houseSelected.value,
                    date: formatDate,

                    name: houseChoosen.name,
                    address: houseChoosen.address
                });

            }
            if (action === CRUD_ACTIONS.EDIT) {
                let formatDate = new Date(currentDate).getTime().toString();
                let res = await editBooKingService({
                    email: email.value,
                    desc: desc,
                    time: time,
                    idHouse: houseSelected.value,
                    date: formatDate,
                    id: editBookingId
                });

            }

        }

    }
    handleActionBooking = (action) => {
        this.setState({
            action: action
        })
    }

    handleEditBooking = (booking, datePicker) => {

        this.setState({
            editBookingId: booking.id,
            email: { value: booking.User.email, label: booking.User.email },
            desc: booking.description,
            time: booking.time,
            houseSelected: { value: booking.idHouse, label: booking.House.name },
            date: datePicker,
        })




    }
    render() {
        let { listHouse, listUser, action, time, currentDate, desc, email, houseSelected, date } = this.state;

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='container'>
                <div className="title" ><FormattedMessage id='menu.system.system-administrator.owner-schedule' /></div>

                <form>
                    <div className='row'>
                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.users' /></label>
                            <Select
                                value={email}
                                onChange={this.handleOnChange}
                                options={listUser}
                            />

                        </div>
                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.house' /></label>

                            <Select
                                value={houseSelected}
                                onChange={this.handleOnChangeHouse}
                                options={listHouse}
                            />

                        </div>


                        <div className='col-12 input-user'>
                            <label><FormattedMessage id='system.booking-manage.desc' /></label>
                            <input
                                type='textarea'
                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'desc')}
                                value={desc}


                            />
                        </div>
                        <div className='col-4 input-user'>
                            <label><FormattedMessage id='system.booking-manage.time' /></label>
                            <select className='form-control'

                                onChange={(event) => this.onChangeInput(event, 'time')}
                                value={time}
                            >
                                <option selected>Choose a option</option>
                                {rangeTime && rangeTime.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                        >{item.value}</option>
                                    )
                                })
                                }
                            </select>

                        </div>

                        <div className='col-4 input-user'>
                            <label><FormattedMessage id='system.booking-manage.date' /></label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                minDate={yesterday}
                                value={date ? date[0] : date[1]}
                            />

                        </div>

                    </div>
                    <div className='col-12 mb-3'>

                        <button
                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning col-1 ' : 'btn btn-primary col-1 btn-save'}
                            onClick={() => this.handleSaveBooking()}


                        ><FormattedMessage id='system.user-manage.save' /> </button>
                    </div>

                </form>

                <BookingTable
                    handleEditBookingFromParent={this.handleEditBooking}
                    handleActionBooking={this.handleActionBooking}
                />


            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
        citiesRedux: state.admin.cities,
        userRedux: state.admin.users,
        postRedux: state.admin.allposts,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getUser: (id) => dispatch(actions.fetchAllUserStart(id)),
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getAllPost: () => dispatch(actions.fetchAllHome()),
        editPostRedux: (data) => dispatch(actions.fetchEditPost(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);
