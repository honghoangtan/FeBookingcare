import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'


import './DoctorExtraInfor.scss'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import NumberFormat from 'react-number-format'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

import Select from 'react-select';
import { CRUD_ACTIONS, languages } from '../../../utils';

import { getExtraInforDocorById } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);



class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

        if (this.props.doctorId) {

            let res = await getExtraInforDocorById(this.props.doctorId)
    
                if (res && res.EC === 0) {
                    this.setState({
                        extraInfor: res.DT
                    })
                }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // DoctorId này được thằng cha truyền vào
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraInforDocorById(this.props.doctorId)

            if (res && res.EC === 0) {
                this.setState({
                    extraInfor: res.DT
                })
            }

            console.log(">> CHECK GET DATA EXTRA IN DETAIL DOCTOR: ", res)
        }
    }

    showHideDetailInfor = (statusShow) => {
        this.setState({
            isShowDetailInfor: statusShow
        })
    }

    render() {

        let { extraInfor } = this.state

        console.log(">>> CHECK EXTRAINFOR: ", extraInfor)

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='test-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic :''}</div>
                    <div className='detail-addres'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic :''},  
                         {extraInfor && extraInfor.provinceData ? extraInfor.provinceData.valueVi :''}
                    </div>
                </div>

                <div className='content-down'>

                    {this.state.isShowDetailInfor === false &&          
                        <div><FormattedMessage id="patient.extra-infor-doctor.text-price" />: 
                            {extraInfor && extraInfor.priceData && this.props.language === languages.VI &&
                                <NumberFormat 
                                    className='currency'
                                    value={extraInfor.priceData.valueVi}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            } 

                            {extraInfor && extraInfor.priceData && this.props.language === languages.EN &&
                                <NumberFormat 
                                    className='currency'
                                    value={extraInfor.priceData.valueVi}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                        
                        <span onClick={() => this.showHideDetailInfor(true)}><FormattedMessage id="patient.extra-infor-doctor.detail" /></span></div>
                    }
                    
                    { this.state.isShowDetailInfor === true &&
                    
                        <div className='show-detail-infor'>

                            <div className='header-detail'><FormattedMessage id="patient.extra-infor-doctor.text-price" />: </div>

                            <div className='body-detail' style={{ padding: '5px'}}>
                            
                                <div className='price'>
                                    <div className='left'><FormattedMessage id="patient.extra-infor-doctor.text-price-lowercase" /></div>
                                    <div className='right'>
                                        {extraInfor && extraInfor.priceData && this.props.language === languages.VI &&
                                            <NumberFormat 
                                                className='currency'
                                                value={extraInfor.priceData.valueVi}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }

                                        {extraInfor && extraInfor.priceData && this.props.language === languages.EN &&
                                            <NumberFormat 
                                                className='currency'
                                                value={extraInfor.priceData.valueVi}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className='note'>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm.</div>

                            </div>

                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" /> 
                                {extraInfor && extraInfor.paymentData && this.props.language === languages.VI ?  extraInfor.paymentData.valueVi : ''} 
                                {extraInfor && extraInfor.paymentData && this.props.language === languages.EN ?  extraInfor.paymentData.valueEn : ''}
                            </div>
                            
                            <div style={{ textAlign: 'right', marginTop: '10px'}}>
                                <span onClick={() => this.showHideDetailInfor(false)}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /> </span>
                            </div>
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
        allDoctorsRedux: state.admin2.allDoctors,
        allRequiredDoctorInforRedux: state.admin2.allRequiredDoctorInfor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor2: (dataInput) => dispatch(actions.saveDetailDoctor2(dataInput)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
