import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


// import { FormattedMessage } from 'react-intl';

import './ManagePatient.scss'

import DatePicker from '../../../components/Input/DatePicker';

import { getPatientByDoctorId, postSendRemedy } from '../../../services/userService'

import moment, { lang } from 'moment';
import { languages } from '../../../utils';

import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';

import LoadingOverlay from 'react-loading-overlay'



class ManagePatient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpen: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        

        this.getDataPatient()
    }   

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state

        let formatedDate = new Date(currentDate).getTime()

        let res = await getPatientByDoctorId({doctorId: user.id, date: formatedDate})

        console.log(">>> CHECK RES ALL PATIENT BY DOCTOR ID: ", res)

        if (res && res.EC === 0) {
            this.setState({
                dataPatient: res.DT
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnchangeDatePicker = (date) => {

        this.setState({
            currentDate: date[0]
        },async () => {
    
            await this.getDataPatient()
        })

    }

    handleConfirm = (item) => {
        console.log(item)
        let data = {
            doctorId: item.docterId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.firstName
        }

        this.setState({
            isOpen: true,
            dataModal: data,
        })

        console.log(data)
    }

    closeBookingModal = () => {
        this.setState({
            isOpen: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataFromChild) => {
        console.log("dataFromChild", dataFromChild)
        this.setState({
            isShowLoading: true
        })

        let { dataModal } = this.state

        let res = await postSendRemedy({
            email: dataFromChild.email,
            imgBase64: dataFromChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        })

        if (res && res.EC === 0) {
            toast.success(res.EM)
            await this.getDataPatient()
            this.closeBookingModal()
            this.setState({
                isShowLoading: false
            })
            
        } else {
            toast.error(res.EM)
            this.setState({
                isShowLoading: true
            })
        }

        console.log("RES", res.DT)
    }

    render() {

        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))

        console.log(">>> CHECK STATE: ", this.state)

        let { dataPatient } = this.state
        let { language } = this.props

        return (
            <LoadingOverlay 
                active={this.state.isShowLoading}
                spinner
                text='Loading'
            >
                <div className='manage-patient-container'>
                    <div className='title'>
                        <span>Quản lý bệnh nhân khám bệnh</span>
                    </div>

                    <div className='manage-patient-body my-3'>
                        <div className='container'>
                            <div className='row'>

                                <div className='schedule col-6'>
                                    <label>Chọn ngày khám</label>
                                    <DatePicker 
                                        className='form-control' 
                                        onChange={this.handleOnchangeDatePicker} 
                                        value={this.state.currentDate} 
                                        minDate={yesterday}
                                    />
                                </div>

                                <div className='list-patient my-5 col-12'>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Thời gian</th>
                                            <th scope="col">Họ và tên</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Giới tính</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                
                                            { dataPatient && dataPatient.length > 0 && 
                                                dataPatient.map((item, index) => {

                                                    let time = language === languages.VI ? item.DataTime.valueVi : item.DataTime.valueEn
                                                    let gender = language === languages.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{item.id}</th>
                                                            <td>{time}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button 
                                                                    className='btn btn-primary'
                                                                    onClick={() => this.handleConfirm(item)}
                                                                >Xác nhận
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    <RemedyModal isOpen={this.state.isOpen} dataModal={this.state.dataModal} closeBookingModal={this.closeBookingModal} sendRemedy={this.sendRemedy}/>
                </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
