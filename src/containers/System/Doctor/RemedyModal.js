import React, { Component } from 'react';
import { connect } from "react-redux";

import { FormattedMessage } from 'react-intl';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import ProfileDoctor from '../ProfileDoctor';

import _ from 'lodash'

// import DatePicker from '../../../../components/Input/DatePicker';

import * as actions from '../../../store/actions'

import { CommonUtils, languages } from '../../../utils';

// import Select from 'react-select';

import moment from 'moment';
// import localization from 'moment/locale/vi'



// import './RemedyModal.scss'
import { toast } from 'react-toastify';


class RemedyModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
            
        }
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

        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
            
        }

        if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {

            
        }
        
    }

    handleOnchangeInput = (e) => {
        let value = e.target.value

        this.setState({
            email: value
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

    handleConfirm = async () => {
        console.log(">>> CHECK CONFIRM ", this.state)

        let timeString = this.builTimeBooking(this.props.dataScheduleTimeModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal)

        // validate input
        // let res = await postPatientBookingAppointment({
        //     email: this.state.email,
        //     doctorId: this.state.doctorId,
        //     birthday: this.state.birthday,
        //     timeType: this.state.timeType,
        //     date: this.state.date,
        //     gender: this.state.selectedGender.value,
        //     address: this.state.address,
        //     phonenumber: this.state.phonenumber,
        //     fullName: this.state.fullName,
        //     language: this.props.language,
        //     timeString: timeString,
        //     doctorName: doctorName
        // })

        // if (res && res.EC === 0) {
        //     toast.success('Booking a new appointment successs')
        //     this.props.closeBookingModal()
        // } else {
        //     toast.error('Booking a new appointment error')
        // }


    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemery = () => {
        this.props.sendRemedy(this.state)
    }

    render() {

        let { isOpen, closeBookingModal, dataScheduleTimeModal, dataModal, sendRemedy } = this.props

        let doctorId = ''
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId
        }

        return (
            <div className='booking-modal'>
                <Modal 
                isOpen={isOpen} 
                toggle={closeBookingModal} 
                size='lg'
                centered
                >
                    <div className='modal-header'>
                        <h5 className='modal-title'>Gửi hóa đơn khám bệnh</h5>
                        <button className='close' type='button' aria-label='close' onClick={closeBookingModal}>
                            <span aria-hidden="true" >x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail" className="form-label">Email bệnh nhân</label>
                                <input 
                                    type="email" 
                                    className="form-control"
                                    id="inputEmail" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="previewImg" className="form-label">Chọn file đơn thuốc</label>
                                <input id='previewImg' type='file' 
                                    onChange={(e) => this.handleOnChangeImage(e)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => this.handleSendRemery()}>
                            Send
                        </Button>{' '}
                        <Button color="secondary" className='px-3' onClick={closeBookingModal}>
                            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
