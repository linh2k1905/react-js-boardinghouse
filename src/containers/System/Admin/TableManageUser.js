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
        this.props.fetchUserRedux();
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
            <table id="TableManageUser">
                <tr>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                {arrUser && arrUser.map((item, index) => {
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
            </table>


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
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
