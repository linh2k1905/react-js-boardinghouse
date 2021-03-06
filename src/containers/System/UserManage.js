import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import ModalUser from './ModalUser';
import {
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService
} from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
    constructor(profs) {
        super(profs)
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {}
        }
    }
    state = {

    }

    async componentDidMount() {

        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errorCode == 0) {
            this.setState(
                {
                    arrUser: response.users
                })

        }
    }

    handleAddNewUser = () => {


        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })

    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser
        })
    }
    createNewUser = async (data) => {

        console.log("check data from child", data);
        try {
            let response = await createNewUserService(data);

            if (response && response.errorCode !== 0) {

                alert(response.messageCode);
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                }
                )
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
            console.log('response', response);
        } catch (error) {
            console.log(error);
        }

    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errorCode === 0) {
                await this.getAllUserFromReact();
            }
            else {
                alert("Loi:" + res.errorCode);
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    handleEditUser = (user) => {

        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })

    }
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            console.log('res', res);
            if (res && res.errorCode === 0) {
                this.setState({ isOpenEditModalUser: false });
                alert(res.messageCode);
            }
            await this.getAllUserFromReact();
        } catch (error) {
            console.log(error);
        }


    }
    render() {
        //console.log('linh check render', this.state)
        let arrUser = this.state.arrUser

        return (
            <div className="modal-users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenEditModalUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        toggleParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}

                    />
                }

                <div className='title text-center'> Qu???n l?? ng?????i d??ng</div>
                <div className='mx-3'><button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className="fas fa-user-plus"></i>Add new user</button></div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUser && arrUser.map((item, index) => {
                                // console.log("linh check map", index, item);
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fas fa-edit"></i> </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i></button>
                                        </td>


                                    </tr>
                                )

                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
