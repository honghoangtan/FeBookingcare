import React, { Component } from 'react';
import { connect } from "react-redux";

import { FormattedMessage } from 'react-intl';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ProfileDoctor from '../ProfileDoctor';

import _ from 'lodash'

import DatePicker from '../../../../components/Input/DatePicker';

import * as actions from '../../../../store/actions'

import { languages } from '../../../../utils';

import Select from 'react-select';

import moment from 'moment';
import localization from 'moment/locale/vi'

import { postPatientBookingAppointment } from '../../../../services/userService'



import './BookingModal.scss'
import { toast } from 'react-toastify';


class BookingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',

            genders: [],
            selectedGender: '',
            timeType: '',
            date: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGender()
    }

    buidDataInputSelect = (inputData) => {
        let result = []

        let language = this.props.language

        if (inputData && inputData.length > 0) {

            inputData.map((item, key) => {

                let obj = {}

                let labelVi = ''
                let labelEn = ''
                

                if (!item.firstName || !item.lastName) {

                    labelVi = `${item.valueVi}`
                    labelEn = `${item.valueEn}`

                    obj.value = item.keyMap


                } else {

                    labelVi = `${item.lastName} ${item.firstName}`
                    labelEn = `${item.firstName} ${item.lastName}`
                    obj.value = item.id

                }
                

                obj.label = language === languages.VI ? labelVi : labelEn
                result.push(obj)
            })

        }

        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genderRedux !== this.props.genderRedux) {

            let dataSelect = this.buidDataInputSelect(this.props.genderRedux)

            console.log(">>> CHECK GENDER LIST: ", dataSelect)

            this.setState({
                genders: dataSelect
            })
        }

        if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {

            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {

                console.log(">>> CHECK TIMETYPE: ", this.props.dataScheduleTimeModal)

                this.setState({
                    doctorId: this.props.dataScheduleTimeModal.doctorId,
                    timeType: this.props.dataScheduleTimeModal.timeType,
                    date: this.props.dataScheduleTimeModal.date
                })
            }
        }
        
    }

    handleOnchangeInput = (e, name) => {
        let value = e.target.value

        let stateCopy = {...this.state}

        stateCopy[name] = value

        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChange = async (selectedGender) => {
        this.setState({ selectedGender }, () =>
          console.log(`Option selected:`, this.state.selectedGender)
        );
    }

    builTimeBooking = (dataScheduleTimeModal) => {

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
            return `${time} - ${date}`
        } else {
            return ''
        }
    }

    buildDoctorName = (dataScheduleTimeModal) => {
        let {language} = this.props

        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {

            let name = language === languages.VI ? 
                `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName} `
                : 
                `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName} `
            
            return name
        } else {
            return ''
        }
    }

    handleConfirmBooking = async () => {
        console.log(">>> CHECK CONFIRM ", this.state)

        let timeString = this.builTimeBooking(this.props.dataScheduleTimeModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal)

        // validate input
        let res = await postPatientBookingAppointment({
            email: this.state.email,
            doctorId: this.state.doctorId,
            birthday: this.state.birthday,
            timeType: this.state.timeType,
            date: this.state.date,
            gender: this.state.selectedGender.value,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            fullName: this.state.fullName,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.EC === 0) {
            toast.success('Booking a new appointment successs')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error')
        }


    }

    render() {

        let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } = this.props

        let doctorId = ''
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId
        }

        console.log("DATA SCHEDTIME TIME: ", dataScheduleTimeModal)

        console.log(">>> CHECK STATE INPUT: ", this.state)

        return (
            <div className='booking-modal'>
                <Modal 
                isOpen={isOpenModalBooking} 
                toggle={closeBookingModal} 
                size='lg'
                centered
                >
                    <ModalHeader toggle={closeBookingModal}><FormattedMessage id="patient.booking-modal.title" /></ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div className='doctor-infor'>
                                    <ProfileDoctor 
                                        doctorId={doctorId}
                                        dataScheduleTimeModal={dataScheduleTimeModal}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputName" className="form-label"><FormattedMessage id="patient.booking-modal.patient-name" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="inputName" 
                                        name="name" 
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPhonenumber" className="form-label">S<FormattedMessage id="patient.booking-modal.phone" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputPhonenumber" 
                                        name="phonenumber"
                                        value={this.state.phonenumber}
                                        onChange={(e) => this.handleOnchangeInput(e, 'phonenumber')}
                                    />
                                </div>
                                <div className="col-6 my-3">
                                    <label htmlFor="inputEmail" className="form-label"><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="inputEmail" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>
                                <div className="col-6 my-3">
                                    <label htmlFor="inputAddress" className="form-label"><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress" 
                                        name="address" 

                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                        
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputReason" className="form-label"><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputReason" 
                                        placeholder="1234 Main St"
                                        name="reason" 
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className="col-8 my-3">
                                    <label htmlFor="inputBirthday" className="form-label"><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker 
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-md-4 my-3">
                                    <label htmlFor="inputState" className="form-label"><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChange}
                                        options={this.state.genders}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </Button>{' '}
                        <Button color="secondary" className='px-3' onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin2.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
