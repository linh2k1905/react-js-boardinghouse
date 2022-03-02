import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { editPostService } from '../../../services/userService'


class CityTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            citiesArr: [],
            ownerArr: []


        }
    }

    async componentDidMount() {
        this.props.getAllCity();
        this.props.getAllOwner()


    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.cities != this.props.cities) {

            this.setState({
                citiesArr: this.props.cities

            })
        }
        if (prevProps.owner != this.props.owner) {

            this.setState({
                ownerArr: this.props.owner

            })
        }





    }



    render() {


        let cities = this.state.citiesArr;
        let owner = this.state.ownerArr;
        return (
            <div className='row mt-3 col-12' >
                <div className='col-4'>
                    <label> Chọn thành phố</label>
                    <select>
                        {cities && cities.length > 0 &&

                            cities.map((item, index) => {

                                return (

                                    <option value={item.id}>{item.name}</option>


                                )
                            })
                        }
                    </select>
                </div>
                <div className='col-4'>
                    <label className=''> Chọn chủ nhà trọ</label>
                    <select>
                        {owner && owner.length > 0 &&

                            owner.map((item, index) => {

                                return (

                                    <option value={item.id}>{item.firstName}</option>


                                )
                            })
                        }
                    </select>
                </div>


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

        cities: state.admin.cities,
        owner: state.admin.owner

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCity: () => dispatch(actions.fetchCitiesStart()),
        getAllOwner: () => dispatch(actions.fetchOwner())


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityTable);
