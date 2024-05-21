import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';


import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import * as actions from '../../../store/actions'

import './UserRedux.scss'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            preivewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
            positionId: '',
            image: '',

            action: CRUD_ACTIONS.CREATE,
            id: ''
        }
    }

    async componentDidMount() {

        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()

        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didUpdate
        // hien tai (this.props) va qua khu
        // []   [3]

        // [3]  [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        } 
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files

        let file = data[0]

        if (file) {

            let base64 = await CommonUtils.getBase64(file)

            console.log('>>> CHECK BASE64 IMAGE: ', base64)

            let objURL = URL.createObjectURL(file)

            this.setState({
                preivewImgURL: objURL,
                image: base64
            })
        }
    }

    openPreivewImage = () => {

        if (!this.state.preivewImgURL) return
        this.setState({
            isOpen: true
        })
    }

   

    onChangeInput = (value, name) => {
        const _copyState = _.cloneDeep({...this.state})

        _copyState[name] = value

        this.setState({
            ..._copyState
        })
    }

    checkValidInput = () => {
        let isValid = true
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId', 'positionId', 'image']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Empty input ${arrInput[i]}`)
                break
            }
        }

        return isValid
    }

    handleSaveUser = () => {

        let check = this.checkValidInput()

        if (check) {
            // call Api
            if (this.state.action === CRUD_ACTIONS.CREATE) {
                console.log('CALL CREATE API')
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    positionId: this.state.positionId,
                    image: this.state.image
                })              
            } 
            
            else if (this.state.action === CRUD_ACTIONS.EDIT) {
                console.log('CALL EDIT API')

                this.props.updateUserRedux({
                    id: this.state.id,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    positionId: this.state.positionId,
                }, () => {
                    console.log(">>>> CHECK HANDLE EDIT: ", this.state)
                })

                this.setState({
                    actions: CRUD_ACTIONS.CREATE
                })
            }

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
                roleId: '',
                positionId: '',
                image: ''
            })
        }
    }

    handleEditUserFromParent = (data) => {

        let imageBase64 = ''
        
        if (data.image) {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')

            console.log(">>> CHECK IMAGE BASE74 BUFFER: ", imageBase64)
        }

        this.setState({
            id: data.id,
            email: data.email,
            password: '12345',
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender,
            roleId: data.roleId,
            positionId: data.positionId,
            image: '',
            preivewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT
        }, () => {
            console.log("CHECK ACTION STATE: ", this.state)
        })
    }

    render() {

        let gender = this.state.genderArr

        let role = this.props.roleRedux

        let position = this.props.positionRedux

        let language = this.props.language

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User redux
                </div>

                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 my-3'><FormattedMessage id="manage-user.add-user" /></div>

                            <div className='col-md-6'>
                                <label htmlFor='inputEmail'>Email</label>
                                <input type='email' className='form-control' id='inputEmail' 
                                    value={this.state.email}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='inputPassword'><FormattedMessage id="manage-user.password" /></label>
                                <input type='password' className='form-control' id='inputPassword'
                                    value={this.state.password}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='col-md-6 my-3'>
                                <label htmlFor='inputFirstname'><FormattedMessage id="manage-user.firstname" /></label>
                                <input type='text' className='form-control' id='inputFirstname' 
                                    value={this.state.firstName}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'firstName')}
                                />
                            </div>
                            <div className='col-md-6 my-3'>
                                <label htmlFor='inputLastname'><FormattedMessage id="manage-user.lastname" /></label>
                                <input type='text' className='form-control' id='inputLastname' 
                                    value={this.state.lastName}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'lastName')}
                                />
                            </div>
                            <div className='col-md-8 my-3'>
                                <label htmlFor='inputAddress'><FormattedMessage id="manage-user.address" /></label>
                                <input type='text' className='form-control' id='inputAddress' 
                                    value={this.state.address}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'address')}
                                />
                            </div>
                            <div className='col-md-4 my-3'>
                                <label htmlFor='inputPhonenumber'><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input type='text' className='form-control' id='inputPhonenumber' 
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'phonenumber')}
                                />
                            </div>
                            <div class="col-md-3">
                                <label for="inputGender" class="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                <select id="inputGender" class="form-select"
                                    value={this.state.gender}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'gender')}
                                >
                                    <option selected>Choose...</option>
                                    { gender && gender.length > 0 &&
                                        gender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap} >{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputRole" class="form-label"><FormattedMessage id="manage-user.role" /></label>
                                <select id="inputRole" class="form-select"
                                    value={this.state.roleId}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'roleId')}
                                >
                                    <option selected>Choose...</option>

                                    { role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap} >{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputPositon" class="form-label"><FormattedMessage id="manage-user.position" /></label>
                                <select id="inputPositon" class="form-select"
                                    value={this.state.positionId}
                                    onChange={(e) => this.onChangeInput(e.target.value, 'positionId')}
                                >
                                    <option selected>Choose...</option>

                                    { position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap} >{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputImage" class="form-label"><FormattedMessage id="manage-user.image" /></label>

                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tai anh <i className='fas fa-upload'></i></label>

                                    <div className='preview-image'
                                        style={ { backgroundImage: `url(${this.state.preivewImgURL})`}}
                                        onClick={() => this.openPreivewImage()}
                                    ></div>
                                </div>
                            </div>

                            <div className='col-md-12 my-3'>
                                <button className={ this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} 
                                    onClick={() => this.handleSaveUser()} 
                                >
                                    { this.state.action === CRUD_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }       
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action}/>

                { this.state.isOpen && 
                    <Lightbox
                        mainSrc={this.state.preivewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />    
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin2.genders,
        isLoadingGender: state.admin2.isLoadingGender,
        positionRedux: state.admin2.positions,
        roleRedux: state.admin2.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser2(data)),
        fetchUserRedux: () => dispatch(actions.fetchUsersStart()),
        updateUserRedux: (data) => dispatch(actions.updateUser2(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (languages) => dispatch(changeLanguageApp(languages))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
