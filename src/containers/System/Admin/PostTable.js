import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { getHouseByEmailUser } from '../../../services/userService';
import moment from 'moment';


class PostTable extends Component {

    constructor(props) {
        super(props);
        this.state = {

            listHouses: [],
            name: '',
            userId: '',
            cityId: '',
            typeHouseId: '',
            price: '',
            address: '',
            image: '',
            isOpen: false,
            area: 0,
            previewImageURL: '',
            lat: '',
            lang: '',
            descVi: '',
            descEn: '',
            action: CRUD_ACTIONS.CREATE,
            idHouseEdit: ''
        }
    }

    async componentDidMount() {
        let { userInfo } = this.props
        if (userInfo.roleId === 1) {
            this.props.getAllPost();

        }
        else {

            let res = await getHouseByEmailUser(userInfo.email);
            this.setState({
                listHouses: res.houses
            })
        }


    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.postRedux != this.props.postRedux && this.props.userInfo.roleId === 1) {

            this.setState({
                listHouses: this.props.postRedux

            })
        }



    }

    handleEditPost = (house) => {

        this.props.handleEditPost(house);
    }
    handleDeletePost = (id) => {
        this.props.deleteAPost(id);



    }
    handleDate = (date) => {
        let dateDDMMYY = new Date(date);
        console.log(moment(dateDDMMYY).format('MM/DD/YYYY'));
        let rlt = moment(dateDDMMYY).format('MM/DD/YYYY');
        return rlt;

    }

    render() {


        let houses = this.state.listHouses;

        return (
            <div className='col-12 mb5'>
                <table className="TableManage">
                    <tr>
                        <th>User</th>
                        <th>Adrress</th>
                        <th>Owner</th>
                        <th>CreateDate</th>
                        <th className='action-special'>Action</th>

                    </tr>
                    {houses && houses.length > 0 &&
                        houses.map((item, index) => {
                            return (

                                <>


                                    <tr id={index}>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.User.firstName}</td>
                                        <td>{this.handleDate(item.createdAt)}</td>
                                        <td className='action-special'>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleEditPost(item)}
                                            >
                                                <i className="fas fa-edit"></i> </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeletePost(item.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i></button>
                                        </td>


                                    </tr>



                                </>
                            )
                        })
                    }

                </table>



            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
        citiesRedux: state.admin.cities,
        ownerRedux: state.admin.owner,
        postRedux: state.admin.allposts,
        userInfo: state.user.userInfo


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllPost: () => dispatch(actions.fetchAllHome()),
        deleteAPost: (id) => dispatch(actions.deleteAPost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTable);
