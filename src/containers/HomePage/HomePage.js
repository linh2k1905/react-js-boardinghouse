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
import HouseListFilter from './Section/HouseListFilter';
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false

        }
    }
    isSearchCheck = (value) => {

        this.setState({
            isSearch: value
        })

    }

    render() {
        let { isSearch } = this.state;


        return (
            <div>
                <HomeHeader
                    isOpenFinder={true}
                    isSearchCheck={this.isSearchCheck} />
                <TypeHouse />
                {isSearch === false ? <HouseList /> : <HouseListFilter />}

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
