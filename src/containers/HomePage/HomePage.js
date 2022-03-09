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
            isSearch: false,
            listHouseFiler: []

        }
    }
    isSearchCheck = (value) => {

        this.setState({
            isSearch: value
        })

    }
    listHouseFilerFunction = (value) => {
        this.setState({
            listHouseFiler: value
        })
        console.log('value check filter list house', value);
    }

    render() {
        let { isSearch } = this.state;


        return (
            <div>
                <HomeHeader
                    isOpenFinder={true}
                    isSearchCheck={this.isSearchCheck}
                    listHouseFilerFunction={this.listHouseFilerFunction}
                />

                {isSearch === false ? <HouseList /> : <HouseListFilter
                    listHouseFilers={this.state.listHouseFiler}

                />}

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
