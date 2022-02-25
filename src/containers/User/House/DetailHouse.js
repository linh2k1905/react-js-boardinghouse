import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHouse.scss'
import { getHouseServiceById } from '../../../services/userService'
class DetailHouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailHouse: {}

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getHouseServiceById(this.props.match.params.id);

            if (res && res.errorCode === 0) {
                this.setState({
                    detailHouse: res.data
                })
            }
        }




    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }
    render() {

        let imagebase64 = ''
        if (this.state.detailHouse.User && this.state.detailHouse.User.image)
            imagebase64 = new Buffer(this.state.detailHouse.User.image, 'base64').toString('binary');
        else {
            imagebase64 = ''
        }
        let firstName, lastName;

        if (firstName)

            firstName = this.state.detailHouse.User.firstName;
        else {
            firstName = ''
        }
        if (lastName)
            lastName = this.state.detailHouse.User.lastName;
        else lastName = ''
        console.log(this.state.detailHouse)
        return (
            <React.Fragment>
                <HomeHeader
                    isOpenFinder={false} />
                <div className='house-detail-container'>
                    <div className='house-intro'>
                        <div className='contain-left'
                            style={{ backgroundImage: `url(${this.state.detailHouse.image})`, width: '823px', height: '300px' }}
                        >

                        </div>

                        <div className='contain-right'

                            style={{ backgroundImage: `url(${imagebase64})` }}
                        >


                        </div>
                    </div>


                    <div className='row'>


                        <div className='detail-house-info'>


                        </div>





                        <div className='schedule-owner'>
                            {lastName + firstName}

                        </div>



                    </div>
                    <div className='comment-house'></div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHouse);
