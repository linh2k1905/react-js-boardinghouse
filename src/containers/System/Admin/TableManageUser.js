import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(profs) {
        super(profs)
        this.state = {
            usersRedux: []

        }
    }
    componentDidMount() {
        this.props.fetchUserByTypeUser('ALL');

    }
    componentDidUpdate(prevProps, prevState, snapsot) {


        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                usersRedux: this.props.listusers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);

    }

    render() {

        let arrUser = this.state.usersRedux;

        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tr>
                        <th>Email</th>
                        <th>Tên</th>
                        <th>Họ</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Tùy chỉnh</th>

                    </tr>
                    {arrUser && arrUser.map((item, index) => {
                        return (
                            <tr id={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>{item.roleId}</td>
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
                </table>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listusers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserByTypeUser: (id) => dispatch(actions.fetchUserByTypeUser(id)),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
