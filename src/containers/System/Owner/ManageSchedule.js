import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <React.Fragment>
                Hello Thiis is my page for owner
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ManageScheduleMenuPath: state.app.ManageScheduleMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
