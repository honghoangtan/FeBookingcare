import React, { Component } from 'react';
import { connect } from "react-redux";

import { languages } from '../../../utils'


import { FormattedMessage } from 'react-intl';

import { getProfileDoctorById } from '../../../services/userService'

import NumberFormat from 'react-number-format'

import _ from 'lodash'

import { Link } from 'react-router-dom';



import './ProfileDoctor.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'


class ProfileDoctor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        await this.getInforDoctor(this.props.doctorId)
    }

    getInforDoctor = async (doctorId) => {
        if (doctorId) {
            let res = await getProfileDoctorById(doctorId)

            if (res && res.EC === 0) {
                this.setState({
                    dataProfile: res.DT
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            await this.getInforDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataScheduleTimeModal) => {

        let {language} = this.props

        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {

            let time = language === languages.VI ?
                dataScheduleTimeModal.timeTypeData.valueVi
                :
                dataScheduleTimeModal.timeTypeData.valueEn

            let date = language === languages.VI ? 
                moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY') 
                : 
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            console.log(">>> CHECK DATE: ", date)
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        Đặt lịch khám miễn phí
                    </div>
                </>
            )
        } else {
            <></>
        }
    }


    render() {

        let { dataProfile } = this.state

        let { language, dataScheduleTimeModal, isShowLinkDetail, isShowPrice, doctorId } = this.props

        let nameVi = '', nameEn = ''
        
        if (dataProfile && dataProfile.positionData) {

            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`

            console.log(">>> CHECK NAME VI, EN: ", nameVi, nameEn)
        }

        console.log(">>> CHECK PROPS SCHEDUULE FROM BOOKING MODAL IN PROFILE: ", this.props.dataScheduleTimeModal)

        console.log(">>> CHECK STATE IN PROFILE DOCTOR: ", dataProfile)
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'> 
                    <div className='content-left' 
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}
                    >

                    </div>

                    <div className='content-right'>
                        <div className='doctor-name'>
                            { language === languages.VI ? nameVi : nameEn}

                        </div>
                        
                        <div className='doctor-description'>
                            {/* { this.props.isDes === true &&
                            
                                <div dangerouslySetInnerHTML={{__html: dataProfile.Markdown.contentHTML }}>
                                            
                                </div>
                                { dataProfile && dataProfile.Markdown && dataProfile.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{__html: dataProfile.Markdown.contentHTML }}>
                                            
                                    </div>
                                } 
                                
                            } */}
                            {this.renderTimeBooking(dataScheduleTimeModal)} 
                        </div>
                    </div>
                    
                    
                </div>

                { isShowPrice === true && 
                    <div className='price my-3'>
                        <span style={{ marginRight: '5px'}}>GIÁ KHÁM</span>
                        {
                            dataProfile && dataProfile.Doctor_Infor && language === languages.VI ?

                                <NumberFormat 
                                    className='currency'
                                    value={dataProfile.Doctor_Infor.priceData.valueVi}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                /> : ''
                        }

                        {
                            dataProfile && dataProfile.Doctor_Infor && language === languages.EN ?

                                <NumberFormat 
                                    className='currency'
                                    value={dataProfile.Doctor_Infor.priceData.valueEn}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={'$'}
                                /> : ''
                        }
                    </div>
                }

                { isShowLinkDetail === true && 
                    <div className='view-detail-doctor my-3'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
