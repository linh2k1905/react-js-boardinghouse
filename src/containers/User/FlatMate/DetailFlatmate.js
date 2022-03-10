import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailFlatmate.scss'
import { getAllUser } from '../../../services/userService';

class DetailFlatmate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailUser: {},
            isOpenFinder: false,


        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getAllUser(this.props.match.params.id);
            console.log("check ", res);

            if (res && res.errorCode === 0) {
                this.setState({
                    detailUser: res.users
                })
            }
        }




    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }
    isSearchCheck = (isOpenFinder) => {
        this.setState({
            isOpenFinder: isOpenFinder

        })
    }

    render() {
        let { isOpenFinder } = this.state;

        let imagebase64 = ''
        if (this.state.detailUser && this.state.detailUser.image)
            imagebase64 = new Buffer(this.state.detailUser.image, 'base64').toString('binary');
        else {
            imagebase64 = ''
        };
        let position = [];
        let { firstName, lastName, tel, address, email } = this.state.detailUser;






        return (
            <React.Fragment>
                <HomeHeader
                    isOpenFinder={isOpenFinder}
                    isSearchCheck={this.isSearchCheck}

                />
                <div className='house-detail-container'>
                    <div className='house-intro'>
                        <div className='contain-left'
                            style={{ backgroundImage: `url(${imagebase64})`, width: '30%', height: '100%' }}
                        >

                        </div>

                        <div className='contain-right'


                        >
                            <div className='title-info'><FormattedMessage id="common.infoFlatmate" /></div>
                            <div className='name-flatmate'><span><FormattedMessage id="common.fullname" /></span>: {firstName} {lastName}</div>
                            <div className='name-flatmate'><span><FormattedMessage id="system.user-manage.email" /></span>: {email}</div>
                            <div className='name-flatmate'><span><FormattedMessage id="system.user-manage.mobile" /></span>: {tel}</div>
                            <div className='name-flatmate'><span><FormattedMessage id="system.user-manage.address" /></span>: {address}</div>


                        </div>
                    </div>


                    <div className='list-post'>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailFlatmate);
