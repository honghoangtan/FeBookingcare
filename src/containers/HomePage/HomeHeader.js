import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import './HomeHeader.scss'

import logo from '../../assets/images/react.png'

import { languages } from '../../utils'

import {changeLanguageApp} from '../../store/actions'
import { withRouter } from 'react-router';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)

        }
    }
    render() {

        let language = this.props.language

        console.log('check language: ', language)

        return (
            <>
            
                <div className='home-header-container'>
                        <div className='container'>
                            <div className='home-header-content'>

                                    <div className='left-content'>
                                        <i className="fas fa-bars mx-3"></i>

                                        <div className='header-logo'>
                                            <img 
                                                src={logo}
                                                width='20'
                                                height='20'
                                                alt='React Bootstrap logo'
                                                onClick={() => this.returnToHome()}
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className='center-content'>
                                        
                                        <div className='child-content'>
                                            <div>
                                                <b><FormattedMessage id="homeHeader.speciality" /> </b>
                                            </div>

                                            <div className='subs-title'><FormattedMessage id="homeHeader.searchdoctor"/></div>
                                        </div>

                                        <div className='child-content'>
                                            <div>
                                                <b><FormattedMessage id="homeHeader.health-facility"/></b>
                                            </div>

                                            <div className='subs-title'><FormattedMessage id="homeHeader.select-room"/></div>

                                        </div>

                                        <div className='child-content'>
                                            <div>
                                                <b><FormattedMessage id="homeHeader.doctor"/></b>
                                            </div>
                                            
                                            <div className='subs-title'><FormattedMessage id="homeHeader.select-doctor"/></div>
                                        </div>
                                        
                                        <div className='child-content'>
                                            <div>
                                                <b><FormattedMessage id="homeHeader.fee"/></b>
                                            </div>

                                            <div className='subs-title'><FormattedMessage id="homeHeader.check-health"/></div>
                                        </div>

                                    </div>

                                    <div className='right-content'>
                                        <div className='support'>
                                            <i className="fas fa-question-circle"></i>
                                            <span><FormattedMessage id="homeHeader.support"/></span>
                                        </div>

                                        <div className={language === languages.VI ? 'language-vn active' : 'language-vn'}>
                                            <span onClick={() => this.changeLanguage(languages.VI)}>VN</span>
                                        </div>

                                        <div className={language === languages.EN ? 'language-en active' : 'language-en'}>
                                            <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                </div>

                { this.props.isShowBanner === true && 
                    <div className='home-header-banner'>

                        <div className='content-up'>
                            <div className='description'>
                                <div className='title'><FormattedMessage id="banner.title1"/></div>
                                <div className='title'><FormattedMessage id="banner.title2"/></div>
                            </div>

                            <div className='search mt-3'>
                                <i className="fas fa-search mx-3"></i>
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                            </div>
                        </div>
                        
                        <div className='content-down'>
                            <div className='options mt-3'>
                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="far fa-hospital"></i>
                                    </div>

                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.examination-specialist"/></div>
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.remote-examination"/></div>
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.general-examination"/></div>
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.medical-test"/></div>
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.mental-health"/></div>
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child my-2'>
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text-child'>
                                        <div><FormattedMessage id="banner.dental-examination"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }

            </>
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
        changeLanguageApp: (languages) => dispatch(changeLanguageApp(languages))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
