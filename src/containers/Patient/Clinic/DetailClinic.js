import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


// import { FormattedMessage } from 'react-intl';

import { getDetailClinicById } from '../../../services/userService'

import _ from 'lodash'

import './DetailClinic.scss'

import HomeHeader from '../../HomePage/HomeHeader';

import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import HomeFooter from '../../HomePage/HomeFooter';
// import Footer from '../../Footer/Footer';




class DetailClinic extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataDetailClinic: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getDetailClinicById({
                clinicId: id
            })

            if (res && res.EC === 0) {
                this.setState({
                    dataDetailClinic: res.DT
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }


    render() {

        let id = this.props.match.params.id
        console.log(">>> CHECK ID CLINIC: ", this.state)
        let { dataDetailClinic } = this.state

        console.log("------")
        console.log("LENGTH: ", dataDetailClinic.doctorClinic)
        console.log(dataDetailClinic)

        let dataDoctorInClinic = dataDetailClinic.doctorClinic

        return (
            <div className='detail-clinic-container'>

                <HomeHeader />

                <div className='container'>

                    <div className='infor-clinic my-5'>
                        <div className='content-left'></div>

                        <div className='content-right text-center'>
                            <div className='name-clinic'>
                                <p>{dataDetailClinic.name}</p>
                            </div>

                            <div className='address-clinic'>
                                <p>{dataDetailClinic.address}</p>
                            </div>
                        </div>
                    </div>
                    { dataDetailClinic  && _.isEmpty(dataDetailClinic.doctorClinic) &&
                        <div className='description-clinic'>
                                { dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                    <div dangerouslySetInnerHTML={{__html: dataDetailClinic.contentHTML }}>
                                    </div>
                                
                                }
                        </div>
            
                    }

                    { dataDetailClinic  && !_.isEmpty(dataDetailClinic.doctorClinic) &&
                        dataDoctorInClinic && dataDoctorInClinic.length > 0 &&
                        dataDoctorInClinic.map((item, index) => {
                            return (
                                <>
                                <div className='title2'>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold'}}>Bác sĩ</h2>
                                </div>
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
                                </>
                            )
                        })
                    }

                </div>
                <HomeFooter />

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
