import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { language } from '../../../utils';
import * as actions from '../../../store/actions';
class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHouseArr: []

        }
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.houseListRedux != this.props.houseListRedux) {
            this.setState({
                listHouseArr: this.props.houseListRedux
            })
        }


    }
    componentDidMount() {
        this.props.loadTopHouse();

    }
    render() {

        let listhouse = this.state.listHouseArr;
        console.log(listhouse)
        return (
            <div className='house-list'>
                {listhouse.map((item, index) => {
                    return (
                        <div>
                            {item.name}
                        </div>
                    )
                })}



            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        houseListRedux: state.user.houseList

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopHouse: () => dispatch(

            actions.fetchAllPostStart()
        )



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
