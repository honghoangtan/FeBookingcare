import React, { Component } from 'react';
import { connect } from "react-redux";

import moment from 'moment';
import localization from 'moment/locale/vi'

import { languages } from '../../../utils'

import { getScheduleDoctorByDate }  from '../../../services/userService'

import { FormattedMessage } from 'react-intl';

import BookingModal from './Modal/BookingModal';


import './DoctorSchedule.scss'


class DoctorSchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allDays: [],
            allAvailableTime: [],

            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let allday = this.setArrDays()

        if (allday && allday.length > 0) {
            this.setState({
                allDays: allday,
            })
        }

        let allDays = this.setArrDays()

        if (this.props.doctorId) {

            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
    
                this.setState({
                    allAvailableTime: res.DT ? res.DT : []
                })
        }

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    setArrDays = () => {
        let arrDate = []

        for (let i = 0; i < 7; i++) {
            let obj = {}

            if (this.props.language === languages.VI) {

                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')

                    console.log(">> CHECK DDMM: ", ddMM)
                    let today = `Hôm nay - ${ddMM}`

                    obj.label = this.capitalizeFirstLetter(today)

                } else {

                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`

                    obj.label = this.capitalizeFirstLetter(today)

                } else {

                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }

            }

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDate.push(obj)
        }

        return arrDate
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.setArrDays()

            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.setArrDays()

            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)

            this.setState({
                allAvailableTime: res.DT ? res.DT : []
            })

        }
    }

    handleOnchangeSelect = async (e) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId

            let date = e.target.value

                let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.EC === 0) {
                this.setState({
                    allAvailableTime: res.DT ? res.DT : []
                })
            }

            console.log(">>> CHECK RES SCHEDULE DOCTOR ID 6: ", res)
            
        }
    }

    handleShowModal = (time) => {

        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {

    let { allDays, allAvailableTime } = this.state
    let { language } = this.props

    console.log(">>> CHECK ALL AVAILABLE TIME: ", allAvailableTime)

        return (
            <>
                <BookingModal 
                    isOpenModalBooking={this.state.isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}
                />
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnchangeSelect(e)}>
                            { allDays && allDays.length > 0 && 
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calender my-3'>
                            <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>

                        <div className='time-content'>
                            { allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        { 

                                            allAvailableTime.map((item, index) => {
                                                let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button 
                                                        key={index} 
                                                        className={language === languages.VI ? 'btn-vi' : 'btn-en'}
                                                        onClick={() => this.handleShowModal(item)}
                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.book-free" /></span>
                                    </div>
                                </>

                                :
                                <div className='no-schedule'><FormattedMessage id="patient.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
