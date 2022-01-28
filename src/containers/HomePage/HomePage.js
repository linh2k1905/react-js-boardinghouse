import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import DropdownCity from './DropDownCity';
import TypeHouse from './Section/TypeHouse';
import BodyHomePage from './BodyHomePage';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomeHeader.scss'
class HomePage extends Component {

    render() {


        return (
            <div>
                <HomeHeader />
                <TypeHouse />
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
