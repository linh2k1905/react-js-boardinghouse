import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import BookingTable from './BookingTable';
import Select from 'react-select'
class PostManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listHouse: [],
            listUser: [],
            userSelected: '',
            houseSelected: '',
            desc: '',
            date: '',
            time: '',


        }
    }

    async componentDidMount() {
        this.props.getAllPost();
        this.props.getUser(4);






    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.postRedux != this.props.postRedux) {
            this.setState({
                listHouse: this.buidDataSelectHouse(this.props.postRedux),

            })
        }
        if (prevProps.userRedux != this.props.userRedux) {
            this.setState({

                listUser: this.buidDataSelect(this.props.userRedux)
            })
        }



    }
    checkValidInput = () => {
        let isValid = true;
        let arrCheck = [

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

        let copyState = { ...this.state }
        copyState[inputId] = event.target.value
        this.setState({
            ...copyState

        })
        console.log(this.state);



    }
    handleEditBooking = (house) => {





    }
    handleSaveBooking = () => {




    }
    buidDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
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
    handleOnChange = (selectedOption) => {

        console.log(selectedOption);
        this.setState({
            userSelected: selectedOption
        })
    }
    handleOnChangeHouse = (value) => {
        this.setState({
            houseSelected: value
        })
    }
    render() {
        let { listHouse, listUser } = this.state;


        return (
            <div className='container'>
                <div className="title" ><FormattedMessage id='menu.system.system-administrator.owner-schedule' /></div>

                <form>
                    <div className='row'>
                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.users' /></label>
                            <Select
                                value={this.state.userSelected}
                                onChange={this.handleOnChange}
                                options={listUser}
                            />

                        </div>
                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.house' /></label>

                            <Select
                                value={this.state.houseSelected}
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


                            />
                        </div>
                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.time' /></label>
                            <input
                                type='text'

                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'time')}


                            />

                        </div>

                        <div className='col-6 input-user'>
                            <label><FormattedMessage id='system.booking-manage.date' /></label>
                            <input
                                type='text'

                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'date')}



                            />

                        </div>
                    </div>
                    <div className='col-12 mb-3'>

                        <button
                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning col-1 ' : 'btn btn-primary col-1 btn-save'}
                            onClick={() => this.handleSavePost()}


                        ><FormattedMessage id='system.user-manage.save' /> </button>
                    </div>

                </form>

                <BookingTable />


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
        postRedux: state.admin.posts


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getUser: () => dispatch(actions.fetchAllUserStart(4)),
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getAllPost: () => dispatch(actions.fetchAllPost()),
        editPostRedux: (data) => dispatch(actions.fetchEditPost(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);
