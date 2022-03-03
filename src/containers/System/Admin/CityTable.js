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
            ownerArr: [],
            allpostsArray: [],



        }
    }

    async componentDidMount() {
        this.props.getAllCity();
        this.props.getAllOwner();
        this.props.getAllHouse();



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
        if (prevProps.allposts != this.props.allposts) {

            this.setState({
                allpostsArray: this.props.allposts

            })
        }





    }



    render() {


        let cities = this.state.citiesArr;
        let owner = this.state.ownerArr;
        let house = this.state.allpostsArray;
        console.log(house);
        return (
            <div className='container-listhouse-filter'>
                <div className='filter-houses row mt-3 col-12'>
                    <div className='col-3'>
                        <label> Chọn thành phố </label>
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
                    <div className='col-3'>
                        <label className=''> Tên </label>
                        <select>
                            {owner && owner.length > 0 &&

                                owner.map((item, index) => {

                                    return (

                                        <option value={item.id}>{item.firstName} {item.lastName}</option>


                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='col-3'>
                        <label className=''> Tình trạng phòng </label>
                        <select>


                            <option value='Y'>Trống</option>
                            <option value='Y'>Đã thuê</option>



                        </select>
                    </div>
                    <div className='col-3'>
                        <button>Thống kê</button>

                    </div>
                </div>

                <React.Fragment>

                    <div className='col-12 mb5'>
                        <table className="TableManage">
                            <tr>
                                <th>User</th>
                                <th>Adrress</th>
                                <th>Owner</th>
                                <th>CreateDate</th>

                            </tr>
                            {house && house.length > 0 &&
                                house.map((item, index) => {
                                    return (

                                        <>


                                            <tr id={index}>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>{item.User.firstName}</td>
                                                <td>{item.createdAt}</td>


                                            </tr>



                                        </>
                                    )
                                })
                            }

                        </table>



                    </div>
                </React.Fragment>



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
