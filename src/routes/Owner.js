import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Owner/ManageSchedule';
import Header from '../containers/Header/Header';
import PostManage from '../containers/System/Admin/PostManage';
import BookingManage from './../containers/System/Admin/BookingManage';
import { USER_ROLE } from './../utils'
class Owner extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;

        return (
            <React.Fragment>
                {
                    (isLoggedIn) && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/post" component={PostManage} />
                            <Route path="/system/manage-booking" component={ManageSchedule} />
                            <Route path="/system/manage-schedule" component={BookingManage} />

                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owner);
