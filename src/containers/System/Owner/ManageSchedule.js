import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Select from 'react-select'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from "../../../components/Input/DatePicker";
const rangeTime = ["9am-10am", "10am-11am", "1pm-2pm", "2pm-3pm", "4pm-5pm"];
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
        console.log(date);
        this.setState({
            currentDate: date[0]
        })

    }
    handleGetTime = (item) => {
        this.setState({
            time: item
        })
    }
    render() {
        const { isLoggedIn } = this.props;
        let time = this.state.rangeTime


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

                                        <button className='btn btn-primary col-2 btn-schedule'
                                            onClick={() => this.handleGetTime(item)}

                                        >{item}
                                        </button>



                                    )
                                })
                            }
                        </div>
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
