import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions';

class TableManageOwner extends Component {
    constructor(profs) {
        super(profs)
        this.state = {
            usersRedux: []

        }
    }
    componentDidMount() {
        this.props.fetchUserRedux('2');

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
                        <th><FormattedMessage id="system.user-manage.email" /></th>
                        <th><FormattedMessage id="system.user-manage.firstname" /></th>
                        <th><FormattedMessage id="system.user-manage.lastname" /></th>
                        <th><FormattedMessage id="system.post-manage.address" /></th>
                        <th><FormattedMessage id="common.role" /></th>
                        <th><FormattedMessage id="common.action" /></th>
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
        fetchUserRedux: (id) => dispatch(actions.fetchUserByTypeUser(id)),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageOwner);
