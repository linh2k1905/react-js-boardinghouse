import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import { getFilterHouseService } from '../../../services/userService'
import moment from 'moment';
import Select from 'react-select';
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    })
}
class CityTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            citiesArr: [],
            ownerArr: [],
            allpostsArray: [],
            idUser: '',
            city: '',
            allpostsFilter: [],
            userselected: {},
            citySelected: {}



        }
    }

    async componentDidMount() {
        this.props.getAllCity();
        this.props.getAllOwner();
        this.props.getAllHouse();



    }
    buidDataSelect = (data) => {
        let result = [{ value: '', lable: 'Chọn một người dùng' }];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = `${item.email}`
                result.push(obj);
            })

        }
        return result;

    }
    buidDataSelectCity = (data) => {
        let result = [{ value: '', lable: 'Chọn một thành phố' }];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = `${item.name}`
                result.push(obj);
            })

        }
        return result;

    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.cities != this.props.cities) {

            this.setState({
                citiesArr: this.buidDataSelectCity(this.props.cities)

            })
        }
        if (prevProps.owner != this.props.owner) {

            this.setState({
                ownerArr: this.buidDataSelect(this.props.owner)

            })
        }
        if (prevProps.allposts != this.props.allposts) {


            this.setState({
                allpostsArray: this.props.allposts

            })
        }








    }


    handleOnChangeSelect = (ownerselected) => {
        this.setState({
            userselected: ownerselected
        })

    }
    handleOnChangeSelectCity = (cityselected) => {
        this.setState({
            citySelected: cityselected
        })

    }
    handleOnClick = async () => {
        let res = await getFilterHouseService({
            idUser: this.state.userselected.value,
            idCity: this.state.citySelected.value
        })

        if (res && res.data) {
            this.setState({
                allpostsArray: res.data

            })
        }
    }
    handleTime = (date) => {
        let time = moment(new Date(date)).format('MM/DD/YYYY');
        return time;
    }
    handleBlockUserPostAndUser = (id, userId) => {
        console.log('Block event success', id, userId);
    }
    render() {


        let house = this.state.allpostsArray;
        let { ownerArr, userselected, citySelected, citiesArr } = this.state
        return (
            <div className='container-listhouse-filter'>
                <div className='filter-houses row col-12 mb-5'>

                    <div className='col-5'>
                        <label>Chọn thành phố</label>

                        <Select

                            onChange={this.handleOnChangeSelectCity}
                            options={citiesArr}
                            value={citySelected}

                        />
                    </div>
                    <div className='col-5'>
                        <label>Chọn email </label>

                        <Select

                            onChange={this.handleOnChangeSelect}
                            options={ownerArr}
                            value={userselected}
                            styles={customStyles}

                        />
                    </div>

                    <div className='col-2'>
                        <button
                            onClick={() => this.handleOnClick()}
                            className='btn-thongke'
                        >Thống kê</button>

                    </div>
                </div>



                <div className='col-12 mb5'>
                    <table className="TableManage">
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Adrress</th>
                            <th>Owner</th>
                            <th>Created Date</th>
                            <th>Khóa</th>


                        </tr>

                        {house && house.length > 0 &&
                            house.map((item, index) => {
                                return (

                                    <>


                                        <tr id={index}>
                                            <td>{item.name}</td>
                                            <td>{item.City.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.User.firstName} {item.User.lastName}</td>
                                            <td>{this.handleTime(item.createdAt)}</td>
                                            <td> <td className='action-special'>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => { this.handleBlockUserPostAndUser(item.id, item.User.id) }}
                                                >
                                                    <i className="fa fa-lock"></i> </button>
                                            </td></td>



                                        </tr>



                                    </>
                                )
                            })
                        }

                    </table>



                </div>




            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

        cities: state.admin.cities,
        owner: state.admin.owner,
        allposts: state.admin.allposts

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCity: () => dispatch(actions.fetchCitiesStart()),
        getAllOwner: () => dispatch(actions.fetchOwner()),
        getAllHouse: () => dispatch(actions.fetchAllHome()),




    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityTable);
