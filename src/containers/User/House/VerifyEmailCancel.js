import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailHouse.scss'
import { handleVerifyBookingCancle } from '../../../services/userService'
class VerifyEmailCancel extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    async componentDidMount() {
        console.log(this.props);

        if (this.props.location && this.props.location.search) {
            let urlparam = new URLSearchParams(this.props.location.search);
            let token = urlparam.get('token');
            let booking = urlparam.get('bookingId');
            console.log(typeof booking, typeof token);
            let res = await handleVerifyBookingCancle({
                token: token,
                idBooking: booking
            })
            console.log(res);
        };




    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }




    render() {



        return (
            <React.Fragment>
                <p>Verify Email Cancel Success</p>


            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailCancel);
