import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { getFilterHouseService } from '../../../services/userService'
import moment from 'moment';
import Select from 'react-select';
import { getAllComment } from '../../../services/userService'

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



    }


    componentDidUpdate(prevProps, prevState, snapsot) {









    }



    render() {



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
                            <th>Name House</th>
                            <th>User</th>
                            <th>Comment content</th>
                            <th>Action</th>



                        </tr>



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
