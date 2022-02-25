import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import TypeHouse from './Section/TypeHouse';
import HouseList from './Section/HouseList';
import BodyHomePage from './BodyHomePage';

import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomeHeader.scss'
import Owner from './Section/Owner';
class HomePage extends Component {

    render() {


        return (
            <div>
                <HomeHeader
                    isOpenFinder={true} />
                <TypeHouse />
                <HouseList />
                <Owner />
                <BodyHomePage />
                <About />
                <HomeFooter />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
