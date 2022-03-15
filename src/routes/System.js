import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import TableManageOwner from '../containers/System/Admin/OwnerRedux';
import TableManageAdmin from '../containers/System/Admin/AdminRedux';
import PostManage from '../containers/System/Admin/PostManage';
import Header from '../containers/Header/Header';
import CityManage from '../containers/System/Admin/CityManage';
import BookingManage from '../containers/System/Admin/BookingManage';
import Owner from './Owner';
import ManageSchedule from '../containers/System/Owner/ManageSchedule'
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {
                    isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-owner" component={TableManageOwner} />
                            <Route path="/system/manage-admin" component={TableManageAdmin} />
                            <Route path="/system/post" component={PostManage} />
                            <Route path="/system/city" component={CityManage} />
                            <Route path="/system/manage-booking" component={ManageSchedule} />
                            <Route path="/system/manage-schedule" component={BookingManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
