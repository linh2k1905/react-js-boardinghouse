import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { language, path } from '../../../utils';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router'
class HouseListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHouseArr: []

        }
    }
    componentDidUpdate(prevProps, prevState, snapsot) {



    }
    componentDidMount() {


    }

    render() {


        return (
            <React.Fragment>
                listHouse
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => {
    return {


    };
};

const mapDispatchToProps = dispatch => {
    return {


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HouseListFilter));
