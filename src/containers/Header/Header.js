import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';

import { USER_ROLE, languages } from '../../utils'
import {changeLanguageApp} from '../../store/actions'

import _ from 'lodash'


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (valueLanguage) => {
        this.props.changeLanguageApp(valueLanguage)
    }

    componentDidMount() {

        let menu = []

        if (this.props.userInfo && !_.isEmpty(this.props.userInfo)) {
            let role = this.props.userInfo.roleId

            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        } 

        this.setState({
            menuApp: menu
        }, () => {
            console.log(">>> CHECK MENU APP: ", this.state)
        })

        console.log('>>> CHECK USER INFOR: ', this.props.userInfo)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        console.log('check user infor: ', userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='language'>
                    <span className='welcome'><FormattedMessage id="homeHeader.welcome" /> { userInfo && userInfo.firstname ?  userInfo.firstname : ''}</span>

                    <span className={ language === languages.VI ? 'language-vi active' : 'language-vi' } onClick={() => this.handleChangeLanguage(languages.VI)}>VN</span>
                    <span className={ language === languages.EN ? 'language-en active' : 'language-en' } onClick={() => this.handleChangeLanguage(languages.EN)}>EN</span>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
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
        changeLanguageApp: (languages) => dispatch(changeLanguageApp(languages))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
