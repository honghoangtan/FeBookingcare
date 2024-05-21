import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'

import { CRUD_ACTIONS, languages, dateFormat } from '../../../utils';

import DatePicker from '../../../components/Input/DatePicker';


import Select from 'react-select';

import moment from 'moment';

import _ from 'lodash'

import { saveBulkScheduleDoctor } from '../../../services/userService'



import './ManageSchedule.scss'
import { toast } from 'react-toastify';

class ManageSchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allDoctorsRedux: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetchAllcodeScheduleTimeRedux()
    }

    buidDataInputSelect = (inputData) => {
        let result = []

        let language = this.props.language

        if (inputData && inputData.length > 0) {

            inputData.map((item, key) => {

                let obj = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                obj.label = language === languages.VI ? labelVi : labelEn
                obj.value = item.id

                result.push(obj)
            })

        }

        return result
    }

    componentDidUpdate (prevProps, prevState, snapshot) {

        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux){

            let dataSelect = this.buidDataInputSelect(this.props.allDoctorsRedux)

            this.setState({
                allDoctorsRedux: dataSelect
            })
        }

        if (prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux){

            let data = this.props.allScheduleTimeRedux

            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false
                    return item
                })

                this.setState({
                    rangeTime: data
                })
            }

        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctorsRedux)

            this.setState({
                allDoctorsRedux: dataSelect
            })
        }
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnchangeDatePicker = (date) => {

        this.setState({
            currentDate: date[0]
        })
    }

    handleClickButtonTime = (schedule) => {

        let rangeTime = this.state.rangeTime

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === schedule.id) {
                    item.isSelected = !item.isSelected
                }

                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate} = this.state

        let result = []

        if (!currentDate) {
            toast.error('Invalid Date')
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!")
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()


        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)

            if (selectedTime && selectedTime.length > 0) {

                selectedTime.map(item => {
                    let obj = {}

                    obj.doctorId = selectedDoctor.value
                    obj.date = formatedDate
                    obj.timeType = item.keyMap

                    result.push(obj)
                })
            } else {
                toast.error('INVALID SELECTED TIME!')
                return
            }
        }

        let res = await saveBulkScheduleDoctor ({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

        if (res && res.EC === 0) {
            toast.success('save infor success')
        } else {
            toast.error('error save bulk schedule doctor')
        }
    }

    render() {

        // console.log('>>> CHECK SELECTED DOCTOR: ', this.state.rangeTime)
        // console.log('>>> CHECK ALL CODE SCHEDULE TIME DOCTOR: ', this.props.allScheduleTimeRedux)

        console.log(">>> CHECK STATE: ", this.state.allDoctorsRedux)

        let rangeTime = this.state.rangeTime

        let language = this.props.language

        console.log(">>> check state: ", this.state.rangeTime)

        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))

        return (
        
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>

                                <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChange}
                                        options={this.state.allDoctorsRedux}
                                    />
                            </div>

                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                
                                <DatePicker 
                                    className='form-control' 
                                    onChange={this.handleOnchangeDatePicker} 
                                    value={this.state.currentDate} 
                                    minDate={yesterday}
                                />
                            </div>

                            <div className='col-12 pick-hour-container'>
                                { rangeTime && rangeTime.length > 0 && 
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button 
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-shedule'} 
                                                key={index} 
                                                onClick={() => this.handleClickButtonTime(item)}
                                            >
                                                { language === languages.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <div className='col-12'>
                                <button 
                                    className='btn btn-primary btn-save-schedule'
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save-schedule" />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin2.allDoctors,
        allScheduleTimeRedux: state.admin2.allScheduleTime

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllcodeScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
