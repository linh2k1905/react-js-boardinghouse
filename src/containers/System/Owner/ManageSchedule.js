import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Select from 'react-select'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from 'react-toastify';
import _ from 'lodash'
import './ManageSchedule.scss';
import moment, { months } from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { bulkCreateSchedulService } from '../../../services/userService'
let rangeTime = [{ value: "7am-8am", isSelect: false },
{ value: "8am-9am", isSelect: false },
{ value: "9am-10am", isSelect: false },
{ value: "10am-11am", isSelect: false },
{ value: "11am-12am", isSelect: false },
{ value: "1pm-2am", isSelect: false },
{ value: "2pm-3pm", isSelect: false },
{ value: "3pm-4pm", isSelect: false },
{ value: "4pm-5pm", isSelect: false },
];
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            listOwner: [],
            selectedOption: {},
            currentDate: '',
            rangeTime: rangeTime,
            time: ''

        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapsot) {


        if (prevProps.owners != this.props.owners) {
            let dataOptions = this.builDataInputSelect(this.props.owners);

            this.setState({
                listOwner: dataOptions

            })
        }






    }
    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        }

        );
    };
    builDataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = `${item.firstName} ${item.lastName}`
                result.push(obj);
            })

        }
        return result;

    }
    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }

    handleGetTime = (item) => {
        let time = this.state.rangeTime;
        time.map((timevalue) => {
            if (timevalue.value == item.value) {
                timevalue.isSelect = !item.isSelect;

            }
        })
        this.setState({
            rangeTime: time
        })
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedOption, currentDate } = this.state;
        if (!currentDate) {
            toast.error("You should choose date");
        }
        if (selectedOption && _.isEmpty(selectedOption)) {
            toast.error("You should choose the Owner");


        }
        let formatDate = new Date(currentDate).getTime();
        console.log("check date", formatDate);
        let result = [];
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelect === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let obj = {};
                    obj.idOwner = selectedOption.value;
                    obj.date = formatDate;
                    obj.time = schedule.value;
                    result.push(obj);

                })

                let res = await bulkCreateSchedulService({
                    arrTime: result,
                    idOwner: selectedOption.value,
                    formatDate: formatDate
                });
                console.log('check res', res);


            }
            console.log("check selected time", selectedTime);
        }


        console.log("check schedule result", result);

    }
    render() {
        const { isLoggedIn } = this.props;
        let time = this.state.rangeTime;


        return (
            <div className='manage-schedule-container'>
                <div className='title'>
                    <FormattedMessage id="menu.system.system-administrator.owner-booking" />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Chọn chủ nhà</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listOwner}

                            />
                        </div>
                        <div className='col-6'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                minDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className='row'>
                            {time && time.length > 0 &&
                                time.map((item, index) => {
                                    return (

                                        <button className={item.isSelect === true ? 'btn  col-1 btn-schedule active' : 'btn  col-1 btn-schedule'}
                                            key={index}

                                            onClick={() => this.handleGetTime(item)}

                                        >{item.value}
                                        </button>



                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <button
                            className='col-1  btn btn-primary btn-save-schedule'
                            onClick={() => { this.handleSaveSchedule() }}
                        >
                            <FormattedMessage id="common.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        owners: state.admin.owner

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchOwner()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
