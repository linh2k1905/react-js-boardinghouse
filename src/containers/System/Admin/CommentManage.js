import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { getFilterHouseService } from '../../../services/userService'
import moment from 'moment';
import Select from 'react-select';
import { getAllComment, deleteCommentById } from '../../../services/userService'

class CommentManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            ownerArr: [],
            allCommentsArray: [],
            idUser: '',
            idHouse: '',
            allcommentsFilter: [],
            userselected: {},
            houseSelected: {}



        }
    }

    async componentDidMount() {

        this.props.getAllOwner();
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




    }
    handleEditComment = (item) => {
        console.log('handle check', item);
    }
    handleDeleteComment = async (id) => {
        await deleteCommentById({
            id: id
        })
    }



    render() {
        let { allCommentsArray } = this.state;



        return (
            <div className='container-listhouse-filter'>
                <div className='filter-houses row col-12 mb-5'>

                    <div className='col-5'>
                        <label>Chọn thành phố</label>

                        <Select

                        />
                    </div>
                    <div className='col-5'>
                        <label>Chọn email </label>

                        <Select

                        />
                    </div>

                    <div className='col-2'>
                        <button

                            className='btn-thongke'
                        >Thống kê</button>

                    </div>
                </div>



                <div className='col-12 mb5'>
                    <table className="TableManage">
                        <tr>
                            <th>User Comment</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Comment content</th>
                            <th>Date Comments</th>
                            <th className='action-special'>Actions</th>



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
                                        <td className='action-special'>   <button
                                            className='btn-edit'
                                            onClick={() => this.handleEditComment(item)}
                                        >
                                            <i className="fas fa-edit"></i> </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteComment(item.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i></button>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleHideComment(item)}
                                            >
                                                <i class="fa fa-lock"></i> </button>
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

        owner: state.admin.owner,
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
