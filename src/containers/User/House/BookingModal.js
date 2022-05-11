import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './Schedule.scss'
import { getScheduleOwnerFromDate } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: [],
            curentDate: '',
            isOpen: false,
            dateSelect: {},
            owner: {},
            detailHouse: {}
        }
    }

    async componentDidMount() {
        let { language, ownerIdFromParent } = this.props;
        this.setArray(language);
        let today = moment(new Date()).add(0, 'days').startOf('day').valueOf();
        if (this.props.ownerIdFromParent && this.props.ownerIdFromParent != 0) {


            let res = await getScheduleOwnerFromDate(ownerIdFromParent, today);
            if (res && res.data) {
                this.setState({
                    availableTime: res.data ? res.data : []
                })
            }



        }
        if (this.props.owner) {
            this.setState({
                owner: this.props.owner ? this.props.owner : ''
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
                owner: this.props.owner
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
                    availableTime: res.data ? res.data : []
                })
            }

        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    toggle = () => {
        this.setState({
            isOpen: false
        })
    }
    handleClickSchduleButton = (item) => {


        this.setState({
            isOpen: true,
            dateSelect: item
        })
    }
    render() {
        let { allDays, availableTime, dateSelect, detailHouse } = this.state;
        let { language, owner } = this.props;

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
                        availableTime && availableTime.length > 0 &&
                        availableTime.map((item, index) => {
                            return (

                                <button className=''

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
                            <div className='col-6'>
                                <h3>Thông tin Chủ trọ</h3>
                                <p>Họ và tên :  {owner && owner.User ? owner.User.firstName : ''}</p>
                                <p>Địa chỉ:{owner ? owner.User.address : ''}</p>
                                <p>Địa chỉ:{owner ? owner.User.email : ''}</p>
                                <p>Tel:{owner ? owner.User.tel : ''}</p>
                            </div>
                            <div className='col-6'>
                                <h3>Thông tin Căn trọ</h3>
                                <p>Tên nhà trọ :  {owner ? owner.name : ''}</p>
                                <p>Địa chỉ:{owner ? owner.address : ''}</p>
                                <p>Giá:{owner ? owner.price : ''} VND</p>
                                <p>Diện tích:{owner ? owner.area : ''}m2</p>
                                <p>Loại nhà:{owner
                                    && owner.HouseType.name && owner.HouseType ? owner.HouseType.nameVi : ''}</p>
                            </div>
                            <form>
                                <label>Email</label>
                                <input className='form-control'></input>
                            </form>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Đặt lịch</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Đã chọn xong</Button>
                    </ModalFooter>
                </Modal>
                <div><FormattedMessage id="common.bookings" /> <i className="far fa-hand-pointer"></i></div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
