import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import CityTable from './CityTable';

class CityManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {




    }
    componentDidUpdate(prevProps, prevState, snapsot) {




    }

    onChangeInput = (event, inputId) => {

        let copyState = { ...this.state }
        copyState[inputId] = event.target.value
        this.setState({
            ...copyState

        })



    }

    render() {


        return (
            <div className='container city-manage'>
                <div className='container'>
                    <CityTable />
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
        citiesRedux: state.admin.cities,
        ownerRedux: state.admin.owner,
        postRedux: state.admin.posts


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getOwner: () => dispatch(actions.fetchOwner()),
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getAllPost: () => dispatch(actions.fetchAllPost()),
        editPostRedux: (data) => dispatch(actions.fetchEditPost(data))



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityManage);
