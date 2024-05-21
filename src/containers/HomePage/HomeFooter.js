import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import './HomeFooter.scss'

import helloDoctor from '../../assets/093706-hellodoctorlogo.png'
import bernart from '../../assets/082316-logo-bernard.png'
import doctorCheck from '../../assets/064252-doctor-check-2.png'


class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer' style={{backgroundColor: 'rgb(239 239 239)'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <h1 style={{color: 'rgb(255, 193, 14)', marginBottom: '8px'}}>BookingCare</h1>
                            
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.recruitment" />
                                </a>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.privacy-policy" />
                                </a>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.operating-regulations" />
                                </a>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.contact-for-cooperation" />
                                </a>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.terms-of-use" />
                                </a>
                                <a style={{color: 'rgb(69, 195, 210)', cursor: 'pointer', marginBottom: '8px'}}>
                                    <FormattedMessage id="homepage.frequently-asked-questions" />
                                </a>
                            </div>
                        </div>
                        <div className='col-6'>
                            <h1 style={{fontSize: '14px', fontWeight: '700', marginBottom: '8px'}}>
                                <FormattedMessage id="homepage.content-sponsorship-partners" />
                            </h1>
                            
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <a style={{cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div>
                                        <img src={helloDoctor} style={{width: '64px', height: '64px'}} />   
                                    </div>

                                    <div style={{marginLeft: '8px', padding: '4px 0'}}>
                                        <p style={{fontSize: '14px', fontWeight: '700', marginBottom: '0', textAlign: 'left'}}>Hello Doctor</p>
                                        <span style={{fontSize: '14px', fontWeight: '400'}}>
                                            <FormattedMessage id="homepage.mental-health" />
                                        </span>
                                    </div>
                                </a>
                                <a style={{cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div>
                                        <img src={bernart} style={{width: '64px', height: '64px'}} />   
                                    </div>

                                    <div style={{marginLeft: '8px', padding: '4px 0'}}>
                                        <p style={{fontSize: '14px', fontWeight: '700', marginBottom: '0', textAlign: 'left'}}>
                                            <FormattedMessage id="homepage.bernard" />

                                        </p>
                                        <span style={{fontSize: '14px', fontWeight: '400'}}>
                                            <FormattedMessage id="homepage.specialized-medicine" />

                                        </span>
                                    </div>
                                </a>
                                <a style={{cursor: 'pointer', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div>
                                        <img src={doctorCheck} style={{width: '64px', height: '64px'}} />   
                                    </div>

                                    <div style={{marginLeft: '8px', padding: '4px 0'}}>
                                        <p style={{fontSize: '14px', fontWeight: '700', marginBottom: '0', textAlign: 'left'}}>
                                            <FormattedMessage id="homepage.doctor-check" />

                                        </p>
                                        <span style={{fontSize: '14px', fontWeight: '400'}}>
                                            <FormattedMessage id="homepage.general-health" />
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{marginTop: '12px', marginBottom: '0', backgroundColor: 'rgb(100, 185, 229)', padding: '12px'}}>
                    &copy; 2024 hoang tan draw.More information, please visit my profile. 
                    <a target='_blank' href='#'> &#8594; Click here &#8592;</a>
                </p>
            
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
