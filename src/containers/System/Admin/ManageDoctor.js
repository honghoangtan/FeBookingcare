import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'


import './ManageDoctor.scss'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

import Select from 'react-select';
import { CRUD_ACTIONS, languages } from '../../../utils';

import { getDetailInforDoctor } from '../../../services/userService';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            desccription: '',
            allDoctorsRedux: [],
            hasOldData: false,

            // save to doctor infor table 
            allPriceRedux: [],
            selectedPrice: '',

            allPaymentRedux: [],
            selectedPayment: '',

            allProvinceRedux: [],
            selectedProvince: '',

            nameClinic: '',
            addressClinic: '',
            note: '',

            listClinic: [],
            listSpecialty: [],

            clinicId: '',
            selectedClinic: '',
            specialtyId: '',
            selectedSpecialty: ''


        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux()

        this.props.getRequiredDoctorInfor()
    }

    buidDataInputSelect = (inputData, price) => {
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

                    if (price) {
                        labelVi = `${item.valueVi} VND`
                        labelEn = `${item.valueEn} USD`
                    }
                     obj.label = language === languages.VI ? labelVi : labelEn

                    obj.value = item.keyMap


                } else {

                    labelVi = `${item.lastName} ${item.firstName}`
                    labelEn = `${item.firstName} ${item.lastName}`
                    obj.value = item.id
                    obj.label = language === languages.VI ? labelVi : labelEn


                }

                if (price === "SPECIALTY"){
                    obj.label = item.name
                    obj.value = item.id
                    
                }

                if (price === "CLINIC"){
                    obj.label = item.name
                    obj.value = item.id
                    
                }
                

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

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctorsRedux)

            let { resPrice, resPayment, resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInforRedux

            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'price')
            let dataSelectPayment = this.buidDataInputSelect(resPayment)
            let dataSelectProvince = this.buidDataInputSelect(resProvince)

            let dataSelectSpecialty = this.buidDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buidDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                allDoctorsRedux: dataSelect,

                allPriceRedux: dataSelectPrice,
                allPaymentRedux: dataSelectPayment,
                allProvinceRedux: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if (prevProps.allRequiredDoctorInforRedux !== this.props.allRequiredDoctorInforRedux) {

            // Lấy các giá trị từ bảng all code (price, province, payment)
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInforRedux

            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'price')
            let dataSelectPayment = this.buidDataInputSelect(resPayment)
            let dataSelectProvince = this.buidDataInputSelect(resProvince)
            let dataSelectSpecialties = this.buidDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buidDataInputSelect(resClinic, 'CLINIC')



            this.setState({
                allPriceRedux: dataSelectPrice,
                allPaymentRedux: dataSelectPayment,
                allProvinceRedux: dataSelectProvince,
                listSpecialty: dataSelectSpecialties,
                listClinic: dataSelectClinic

            }, () => {
                console.log(">>> CHECK DATA IN STATE: ", this.state.allPriceRedux, this.state.allPaymentRedux, this.state.allProvinceRedux)
            })

            console.log(">>> CHECK DID MOUNT: ", this.props.allRequiredDoctorInforRedux)
        }
    }

    
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown() {
        this.props.saveDetailDoctor2({

            // save in markdown
            contentHTML:this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.desccription,
            id: this.state.selectedDoctor.value,
            action: this.state.hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            // save in table doctorinfor
            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayment.value,
            provinceId: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
        })
        console.log(">>> CHECK STATE MANAGE DOCTOR: ", this.state)



    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );

        let res = await getDetailInforDoctor(selectedDoctor.value)

        if (res && res.EC === 0 && res.DT.Markdown.contentMarkdown) {

            let markdown = res.DT.Markdown


            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = ''

            let selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedSpecialty =''

            let { allPaymentRedux, allPriceRedux, allProvinceRedux, listSpecialty } = this.state

            if (res.DT.Doctor_Infor) {
                addressClinic = res.DT.Doctor_Infor.addressClinic
                nameClinic = res.DT.Doctor_Infor.nameClinic
                note = res.DT.Doctor_Infor.note

                paymentId = res.DT.Doctor_Infor.paymentId
                priceId = res.DT.Doctor_Infor.priceId
                provinceId = res.DT.Doctor_Infor.provinceId

                selectedPayment = allPaymentRedux.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = allPriceRedux.find(item => {
                    return item && item.value === priceId
                })

                console.log(">>> CHECK SELECTED PRICE: ", selectedPrice)

                selectedProvince = allProvinceRedux.find(item => {
                    return item && item.value === provinceId
                })

                let selectedId = res.DT.Doctor_Infor.specialtyId

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === selectedId
                })

            } else {
                if (res.DT.Doctor_Infor.addressClinic === null) {

                    this.setState({
                        nameClinic: '',
                        addressClinic: '',
                        note: '',
                        selectedPrice: '',
                        selectedPayment: '',
                        selectedProvince: '' 
                    })
                }
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                desccription: markdown.description,
                hasOldData: true,

                nameClinic: addressClinic,
                addressClinic: nameClinic,
                note: note,

                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty

                
            }, () => {
                console.log(">>> CHECK HAS OLD DATA: ", this.state)
            })

        } else if (res.DT.Markdown.contentMarkdown === null && res.DT.Doctor_Infor.addressClinic === null) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                desccription: ' ',
                hasOldData: false,

                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: ''
            }, () => {
                console.log(">>> CHECK HAS OLD DATA: ", this.state.hasOldData)
            })
        }
        console.log('>> CHECK MASK DOWN FROM MANAGE DOCTOR: ', res.DT)
    };

    handleOnchangeTextarea(e, name) {

        let stateCopy = {...this.state}

        stateCopy[name] = e

        this.setState({
            ...stateCopy
        }, () => {
            console.log(">>> CHECK STATE NAME CLINIC: ", this.state.addressClinic)
        })
    }

    handleChangeSelectedDoctorInfo = (selectedOption, name) => {
        console.log(">>> CHECK NEW SELECT ONCHANGE: ", selectedOption, name)

        let stateName = name.name
        let stateCopy = {...this.state}

        stateCopy[stateName] = selectedOption

        this.setState({
            ...stateCopy
        }, () => {
            console.log('>>> CHECK STATE AFTER SELECT PRICE: ', this.state.selectedPrice)
        })
    }

    render() {

        console.log('>>> CHECK STATE MANAGE DOCTOR: ', this.state.listSpecialty)

        return (
            <div className="manage-doctor-container">
                <div className='container'>
                    <div className='row'>
                        <div className='title'>
                            <FormattedMessage id="admin.manage-doctor.title" />
                        </div>

                        <div className='more-infor my-5'>
                            <div className='row'>

                                <div className='col-6'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChange}
                                        options={this.state.allDoctorsRedux}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                    />
                                </div>

                                <div className='col-6 content-left form-group'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.intro" /></label>

                                    <textarea 
                                        className='form-control' 
                                        onChange={(e) => this.handleOnchangeTextarea(e.target.value, 'desccription')} 
                                        value={this.state.desccription ? this.state.desccription : ''}
                                        placeholder={<FormattedMessage id="admin.manage-doctor.intro" />}
                                    />
                                </div>
                                
                            </div>
                        </div>

                        <div className='more-infor-extra'>
                            <div className='row'>
                                <div className='col-4'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.price" /></label>
                                    <Select
                                        value={this.state.selectedPrice}
                                        onChange={this.handleChangeSelectedDoctorInfo}
                                        options={this.state.allPriceRedux}
                                        name='selectedPrice'
                                        placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                    />
                                </div>

                                <div className='col-4'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.payment" /></label>
                                    <Select
                                        value={this.state.selectedPayment}
                                        onChange={this.handleChangeSelectedDoctorInfo}
                                        options={this.state.allPaymentRedux}
                                        name='selectedPayment'
                                        placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                    />
                                </div>

                                <div className='col-4'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.province" /></label>
                                    <Select
                                        value={this.state.selectedProvince}
                                        onChange={this.handleChangeSelectedDoctorInfo}
                                        options={this.state.allProvinceRedux}
                                        name='selectedProvince'
                                        placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                    />
                                </div>

                                <div className='col-4 my-3'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                                    <input 
                                        className='form-control'
                                        value={this.state.nameClinic}
                                        onChange={(e) => this.handleOnchangeTextarea(e.target.value, 'nameClinic')}
                                    />
                                </div>

                                <div className='col-4 my-3'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                                    <input 
                                        className='form-control'
                                        value={this.state.addressClinic}
                                        onChange={(e) => this.handleOnchangeTextarea(e.target.value, 'addressClinic')}
                                    />

                                </div>

                                <div className='col-4 my-3'>
                                    <label className='my-2'><FormattedMessage id="admin.manage-doctor.note" /></label>
                                    <input 
                                        className='form-control' 
                                        value={this.state.note}
                                        onChange={(e) => this.handleOnchangeTextarea(e.target.value, 'note')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='clinic-specialty'>
                            <div className='row'>
                                <div className='col-6 my-3'>
                                        <label className='my-2'><FormattedMessage id="admin.manage-doctor.choose-Specialty" /></label>
                                        <Select
                                            value={this.state.selectedSpecialty}
                                            onChange={this.handleChangeSelectedDoctorInfo}
                                            options={this.state.listSpecialty}
                                            name='selectedSpecialty'
                                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-Specialty" />}
                                        />
                                </div>

                                <div className='col-6 my-3'>
                                        <label className='my-2'><FormattedMessage id="admin.manage-doctor.choose-clinic" /></label>
                                        <Select
                                            value={this.state.selectedClinic}
                                            onChange={this.handleChangeSelectedDoctorInfo}
                                            options={this.state.listClinic}
                                            name='selectedClinic'
                                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
                                        />
                                </div>
                            </div>
                        </div>

                        <div className='manage-doctor-editor my-3'>
                            <MdEditor 
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange} 
                                value={this.state.contentMarkdown ? this.state.contentMarkdown : ''}
                            />
                        </div>

                        <div className='my-3'>
                            <button 
                                className={ this.state.hasOldData === true ? 'btn btn-primary save-content-doctor' : 'btn btn-warning create-content-doctor'}
                                onClick={() => this.handleSaveContentMarkdown()}
                            >
                                { this.state.hasOldData === true ?
                                    <span><FormattedMessage id="admin.manage-doctor.add" /></span> 
                                    : 
                                    <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                            }
                            </button>
                        </div>
                        
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
