import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import './Schedule.scss'
import { getScheduleOwnerFromDate } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'
class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        this.setArray(language);





    }
    setArray = (language) => {
        let allDays = [];
        for (let i = 0; i <= 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
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
    }

    handleSelectSchedule = async (event) => {
        if (this.props.ownerIdFromParent && this.props.ownerIdFromParent != 0) {
            let id = this.props.ownerIdFromParent;
            let date = event.target.value;
            console.log('useer and date ', id, typeof date);
            let res = await getScheduleOwnerFromDate(id, date);
            console.log(res);

        }
    }
    render() {
        let { allDays } = this.state;

        return (
            <React.Fragment>
                <div className='all-schedule'>

                    <select
                        onChange={(event) => this.handleSelectSchedule(event)}
                    >
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >{item.label}</option>
                                )
                            })
                        }



                    </select>
                </div>
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
