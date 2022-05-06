import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import DetailHouse from './User/House/DetailHouse'
import DetailTypeHouse from './User/House/DetailTypeHouse'

import DetailFlatmate from './User/FlatMate/DetailFlatmate';
import HomePage from './HomePage/HomePage.js'
import CustomScrollbars from '../components/CustomScrollbars.js';
import Owner from '../routes/Owner';
import VerifyEmail from './User/House/VerifyEmail';
import VerifyEmailCancel from './User/House/VerifyEmailCancel';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">



                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(Owner)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_HOUSE} component={DetailHouse} />
                                    <Route path={path.DETAIL_TYPE_HOUSE} component={DetailTypeHouse} />
                                    <Route path={path.DETAIL_FLATMATE} component={DetailFlatmate} />
                                    <Route path={path.VERIFY_MAIL} component={VerifyEmail} />
                                    <Route path={path.VERIFY_MAIL_CANCEL} component={VerifyEmailCancel} />
                                </Switch>
                            </CustomScrollbars>
                        </div>



                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />


                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);