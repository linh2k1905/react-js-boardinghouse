import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './Schedule.scss'
import { getScheduleOwnerFromDate, handlePostBooking } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: [],
            isOpen: false,
            dateSelect: {},
            detailHouse: {},
            ownerState: {},
            email: '',
            desc: '',
            tel: '',
            password: '',
            created: false,
            name: '',
            nameOwner: '',
            address: ''

        }
    }

    async componentDidMount() {
        let { language, ownerIdFromParent } = this.props;
        this.setArray(language);
        let today = moment(new Date()).add(0, 'days').startOf('day').valueOf();
        if (this.props.ownerIdFromParent && this.props.ownerIdFromParent != 0) {


            let res = await getScheduleOwnerFromDate(ownerIdFromParent, today);

            if (res && res.data) {
                console.log('check time by res', res.data);
                this.setState({
                    availableTime: res.data
                })
            }



        }
        if (this.props.owner) {


            this.setState({
                ownerState: this.props.owner
            })
        }




    }
    setArray = (language) => {
        let allDays = [];
        for (let i = 0; i <= 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;

                } else {
                    obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }

            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');

                    let today2 = `Today - ${ddMM}`;

                    obj.label = today2;

                }
                else obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }

        this.setState({
            allDays: allDays
        })
    }

    componentDidUpdate(prevProps, prevState, snapsot) {
        if (this.props.language !== prevProps.language) {
            this.setArray(this.props.language);

        }
        if (this.props.owner != prevProps.owner) {


            this.setState({
                ownerState: this.props.owner
            })
        }




    }

    handleSelectSchedule = async (event) => {
        if (this.props.ownerIdFromParent && this.props.ownerIdFromParent != 0) {
            let id = this.props.ownerIdFromParent;
            let date = event.target.value;
            let res = await getScheduleOwnerFromDate(id, date);


            if (res && res.data) {
                this.setState({
                    availableTime: res.data,
                })
            }

        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    toggle = () => {
        this.setState({
            isOpen: false,
            email: '',
            desc: '',
            tel: '',
            password: '',

        })
    }
    checkInput = () => {
        let { email, password, dateSelect } = this.state;
        if (!email || !password) {
            alert("Vui lòng nhập email mật khẩu");
            return false;
        }
        else if (!dateSelect.time || !dateSelect.date) {
            alert("Vui lòng chọn ngày tháng năm");
            return false;
        }
        return true;
    }
    handleClickBookingButton = async () => {
        let { userInfo } = this.props;

        if (this.checkInput() && userInfo) {
            let res = await handlePostBooking({
                firstName: userInfo.firstName ? userInfo.firstName : '!',
                lastName: userInfo.lastName ? userInfo.lastName : '!',
                email: this.state.email,
                password: this.state.password,
                idHouse: this.state.ownerState.id,
                time: this.state.dateSelect.time,
                date: this.state.dateSelect.date,
                tel: this.state.tel ? this.state.tel : '',
                desc: this.state.desc ? this.state.desc : '',
                name: this.state.ownerState.name ? this.state.ownerState.name : '',
                address: this.state.ownerState.address ? this.state.ownerState.address : '',
                nameOwner: this.state.ownerState.User && this.state.ownerState.User.firstName && this.state.ownerState.User.lastName ? this.state.ownerState.User.firstName + " " + this.state.ownerState.User.lastName : ' '
            });
            console.log(res);
            if (res.data.errorCode === 0) {
                this.setState({
                    created: true,


                })
                toast.success("Đã đặt lịch thành công");

            }
            else {
                toast.error(res.data.errorMessage);
                this.setState({
                    created: false
                })
            }
            if (this.state.created) {
                this.toggle();
            }
            else {
                this.props.history.push('/home')
            }

        }


    }
    handleClickSchduleButton = (item) => {

        console.log(' check date', item.date);
        this.setState({
            isOpen: true,
            dateSelect: item
        })
    }
    handleShowDateFromString = (str) => {
        str = parseInt(str);
        let dateURTC = moment(new Date(str)).format('DD/MM/YYYY');
        return dateURTC;

    }
    handleInputBooking = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

    }
    render() {
        let { allDays, availableTime, dateSelect, detailHouse, ownerState } = this.state;
        let { language, userInfo } = this.props;

        return (
            <React.Fragment>
                <div className='all-schedule'>
                    <h3><FormattedMessage id="common.bookingsOwner" /> </h3>

                    <select
                        onChange={(event) => this.handleSelectSchedule(event)
                        }

                    >

                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >{this.capitalizeFirstLetter(item.label)}</option>
                                )
                            })
                        }



                    </select>


                </div>


                <div className='available-time'>
                    {
                        availableTime &&
                        availableTime.map((item) => {
                            return (

                                <button

                                    onClick={() => this.handleClickSchduleButton(item)}
                                >{item.time}</button>
                            )
                        })
                    }
                </div>

                <Modal
                    //centered={true}
                    size={'lg'}
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}

                >
                    <ModalHeader >
                        <div className='header-left'>Đặt lịch hẹn</div>



                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>

                            {ownerState && ownerState.User ?
                                <div className='col-6'>
                                    <h3>Thông tin Chủ trọ</h3>
                                    <p>Họ và tên :  {ownerState.User.firstName} {ownerState.User.lastName}</p>
                                    <p>Địa chỉ:{ownerState.User.address}</p>
                                    <p>Địa chỉ mail:{ownerState.User.email}</p>
                                    <p>Tel:{ownerState.User.tel}</p>
                                    <p>Thời gian: {dateSelect.time}</p>
                                    <p>Ngày: {this.handleShowDateFromString(dateSelect.date)}</p>

                                </div> : ""

                            }

                            {ownerState && ownerState.HouseType ?
                                <div className='col-6'>
                                    <h3>Thông tin Căn trọ</h3>
                                    <p>Tên nhà trọ :  {ownerState.name}</p>
                                    <p>Địa chỉ:{ownerState.address}</p>
                                    <p>Giá:{ownerState.price} VND</p>
                                    <p>Diện tích:{ownerState.area}m2</p>
                                    <p>Loại nhà:{
                                        ownerState.HouseType.nameVi}</p>
                                </div>
                                : ""}


                            <form>
                                <label>Email</label>
                                { }
                                <input type="text" className='form-control'

                                    onChange={(event) => this.handleInputBooking(event, 'email')}
                                    value={this.state.email}

                                ></input>
                                <label>Password</label>
                                <input
                                    type="password"
                                    className='form-control'
                                    onChange={(event) => this.handleInputBooking(event, 'password')}
                                    value={this.state.password}

                                ></input>
                                <label>Tel</label>
                                <input type="text"
                                    className='form-control'
                                    onChange={(event) => this.handleInputBooking(event, 'tel')}
                                    value={this.state.tel}

                                ></input>
                                <label>Lời nhắn gửi</label>
                                <input
                                    type='textarea'
                                    className='form-control'
                                    value={this.state.desc}
                                    onChange={(event) => this.handleInputBooking(event, 'desc')}

                                ></input>

                            </form>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClickBookingButton}>Đặt lịch</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Đóng</Button>
                    </ModalFooter>
                </Modal>
                <div><FormattedMessage id="common.bookings" /> <i className="far fa-hand-pointer"></i></div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule));
