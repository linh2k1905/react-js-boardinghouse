import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { getFilterHouseService } from '../../../services/userService'
import moment from 'moment';
import Select from 'react-select';
import { getAllComment, deleteCommentById, editCommentService } from '../../../services/userService'

class CommentManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            usersArr: [],
            allHouses: [],
            allCommentsArray: [],
            idUser: '',
            idHouse: '',
            allcommentsFilter: [],
            userselected: {},
            houseSelected: {}



        }
    }
    refresh = () => {
        window.location.reload();
    }
    async componentDidMount() {

        this.props.getAllOwner(4);
        this.props.getAllHouse();
        let res = await getAllComment();
        console.log('check res', res);
        if (res && res.comments) {
            this.setState({
                allCommentsArray: res.comments
            })
        }



    }
    handleTime = (date) => {
        let time = moment(new Date(date)).format('MM/DD/YYYY');
        return time;
    }

    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.users != this.props.users) {
            this.setState(
                { usersArr: this.buidDataSelect(this.props.users) })

        }
        if (prevProps.allposts != this.props.allposts) {
            this.setState(
                { allHouses: this.buidDataSelectHouse(this.props.allposts) })

        }





    }
    handleHideComment = async (item) => {
        await editCommentService({
            id: item.id
        })
        window.location.reload();
    }
    handleDeleteComment = async (item) => {
        await deleteCommentById(item.id);
        this.refresh();
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
                obj.label = `${item.name} ${item.address}`
                result.push(obj);
            })

        }
        return result;

    }



    render() {
        let { allCommentsArray, usersArr, allHouses } = this.state;




        return (
            <div className='container-listhouse-filter'>
                <div className='filter-houses row col-12 mb-5'>

                    <div className='col-4 mt-2'>
                        <label><FormattedMessage id="common.filter-commenter" /></label>

                        <Select
                            options={usersArr}

                        />
                    </div>
                    <div className='col-6 mt-2'>
                        <label><FormattedMessage id="common.filter-house" /></label>

                        <Select
                            options={allHouses}
                        />
                    </div>

                    <div className='col-2'>
                        <button

                            className='btn-thongke'
                        ><FormattedMessage id="common.filter" /></button>

                    </div>
                </div>



                <div className='col-12 mb5'>
                    <table className="TableManage">
                        <tr>
                            <th><FormattedMessage id="common.username" /></th>
                            <th><FormattedMessage id="common.content" /></th>
                            <th><FormattedMessage id="common.status" /></th>
                            <th><FormattedMessage id="system.post-manage.address" /></th>
                            <th><FormattedMessage id="system.booking-manage.date" /></th>
                            <th className='action-special'><FormattedMessage id="common.action" /></th>



                        </tr>
                        {allCommentsArray && allCommentsArray.length > 0 &&
                            allCommentsArray.map((item) => {
                                return (
                                    <tr>

                                        <td>{item.User.firstName + item.User.lastName}</td>
                                        <td>{item.content}</td>
                                        <td>{item.status}</td>
                                        <td>{item.House.name}</td>
                                        <td>{this.handleTime(item.createdAt)}</td>
                                        <td className='action-special'>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteComment(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i></button>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleHideComment(item)}
                                            >
                                                {item.status === "OK" ? <i className="fa fa-lock"></i> : <i className="fa fa-unlock"></i>}   </button>
                                        </td>
                                    </tr>
                                )
                            })}



                    </table>



                </div>




            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

        users: state.admin.users,
        allposts: state.admin.allposts

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllOwner: (id) => dispatch(actions.fetchAllUserStart(id)),
        getAllHouse: () => dispatch(actions.fetchAllHome()),




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentManage);
