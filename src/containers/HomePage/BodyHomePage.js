import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'


class BodyHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {



        };


    }
    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    }

    render() {


        return (
            <React.Fragment >

                <div className='body-homepage'></div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyHomePage);
