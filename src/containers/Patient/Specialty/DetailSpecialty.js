import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


import { FormattedMessage } from 'react-intl';

import HomeHeader from '../../HomePage/HomeHeader';

import './DetailSpecialty.scss'

import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';

import {getDoctorBySpecialtyId, getAllCodeService} from '../../../services/userService'

import { languages } from '../../../utils';

import _ from 'lodash'


class DetailSpecialty extends Component {

    constructor(props) {
        super(props)

        this.state = {
            arrDoctorId: [6],
            dataSpecialtyHasDoctor: [],
            testArrList: [],
            listProvince: []

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            // this.setState({
            //     currentDoctorId: id
            // })


            let res = await getDoctorBySpecialtyId({
                specialtyId: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')

            let dataProvince = resProvince.DT
            if (dataProvince && dataProvince.length > 0) {
                dataProvince.unshift({
                    createAt: null,
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueEn: 'ALL',
                    valueVi: 'Toàn quốc'
                })
            }


            if (res && res.EC === 0 && resProvince && resProvince.EC === 0) {
                this.setState({
                    dataSpecialtyHasDoctor: res.DT,
                    testArrList: res.DT.doctorSpecialty,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnchangeSelect = async (e) => {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = e.target.value

            let res = await getDoctorBySpecialtyId({
                specialtyId: id,
                location: location
            })

            if (res && res.EC === 0) {

                this.setState({
                    dataSpecialtyHasDoctor: res.DT,
                    testArrList: res.DT.doctorSpecialty,
                })
            }
        }
    }


    render() {

        let { dataSpecialtyHasDoctor, testArrList, listProvince } = this.state
        let { language } = this.props

        console.log(">>> CHECK DETAIL SPECIALTY HAS DOCTOR: ", testArrList, listProvince)

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                    <div className='description-specialty'>
                        { dataSpecialtyHasDoctor && !_.isEmpty(dataSpecialtyHasDoctor) &&
                            <div dangerouslySetInnerHTML={{__html: dataSpecialtyHasDoctor.contentHTML }}>
                            </div>
                        
                        }
                    </div>
                <div className='detail-special-body'>
                    <div className='search-location'>
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            { listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </option>

                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    { testArrList && testArrList.length > 0 ?
                        testArrList.map((item, index) => {
                            return (            
                                <div className='each-doctor my-3' key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor 
                                            doctorId={item.doctorId}
                                            isDes={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>

                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item.doctorId}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor my-3'>
                                            <DoctorExtraInfor 
                                                doctorId={item.doctorId} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className='my-3'>
                            <p>Không có danh sách bác sĩ nào thuộc khu vực này</p>
                        </div>
                    }
                </div>


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

export default (connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
