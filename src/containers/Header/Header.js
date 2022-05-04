import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, ownerMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash';
import { withRouter } from 'react-router';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        if (language === LANGUAGES.VI)
            this.props.changeLanguageAppRedux(LANGUAGES.EN);
        if (language === LANGUAGES.EN)
            this.props.changeLanguageAppRedux(LANGUAGES.VI);
    }
    componentDidMount() {
        let userInfo = this.props.userInfo;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role == USER_ROLE.ADMIN) {
                menu = adminMenu;

            }
            if (role == USER_ROLE.OWNER) {
                menu = ownerMenu;
            }
            if (role === USER_ROLE.FLATMATE || role === USER_ROLE.USER) {
                this.props.history.push('/home')


            }
        }
        if (!userInfo) {
            this.props.history.push('/login')

        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        let imageBase64 = '';
        if (userInfo.image) {
            let image = userInfo.image;
            imageBase64 = Buffer.from(image, 'base64').toString('binary');
        }

        return (
            <div className="header-container">

                <Navigator menus={this.state.menuApp} />
                <div className='middle-taskbar'>
                    <div className='welcome'
                        style={imageBase64 ? { backgroundImage: `url(${imageBase64})` } : ""}
                    >

                    </div>
                </div>
                <div className='language'>

                    <span>
                        <FormattedMessage id='header.hello' />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
                    </span>
                    <span
                        className={language === LANGUAGES.VI ?
                            'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(language)}
                    >
                        <i class="fas fa-globe"></i>
                    </span>



                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
