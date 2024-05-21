import React, { Component } from 'react';
import { connect } from "react-redux";

import { languages } from '../../../utils'


import { FormattedMessage } from 'react-intl';

import { CommonUtils } from '../../../utils'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { createNewClinic } from '../../../services/userService'


import './ManageClinic.scss'
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameClinic: '',
            contentMarkdown: '',
            contentHTML: '',
            preivewImgURL: '',
            imageBase64: '',
            address: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnchangeNameClinic = (e, name) => {

        const coptyState = {...this.state}

        coptyState[name] = e

        this.setState({
            ...coptyState
        })
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
                imageBase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    checkValidInput = () => {
        let isValid = true

        const arrInput = ['nameClinic', 'contentMarkdown', 'contentHTML', 'imageBase64', 'address']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Empty input ${arrInput[i]}`)
                break
            }
        }

        return isValid
    }

    handleSave = async () => {
        console.log('>>> CHECK DATA INPUT CLINIC: ', this.state)

        const check = this.checkValidInput()

        if (check) {
            let res = await createNewClinic({
                name: this.state.nameClinic,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                image: this.state.imageBase64,
                address: this.state.address
            })

            if (res && res.EC === 0) {
                toast.success(res.EM)

                this.setState({
                    nameSpecialty: '',
                    preivewImgURL: '',
                    imageBase64: '',
                    contentMarkdown: '',
                    contentHTML: ''
                })
            } else {
                toast.error(res.EM)
            }
        }
    }


    render() {

        return (
            <div className='manage-clinic-container'>
                <div className='title'>QUẢN LÝ PHÒNG KHÁM</div>

                <div className='specialty-infor my-4'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label>Tên phòng khám</label>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Vui lòng nhập tên phòng khám' 
                                    value={this.state.nameClinic}
                                    onChange={(e) => this.handleOnchangeNameClinic(e.target.value, 'nameClinic')}
                                />
                            </div>

                            <div className='col-md-6 form-group'>
                                <label>Địa chỉ phòng khám</label>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Vui lòng nhập địa chỉ phòng khám' 
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeNameClinic(e.target.value, 'address')}
                                />
                            </div>

                            <div class="col-md-6 my-3">
                                <label for="inputImage" class="form-label">Ảnh phòng khám</label>

                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tai anh <i className='fas fa-upload'></i></label>

                                    <div className='preview-image'
                                        style={ { backgroundImage: `url(${this.state.preivewImgURL})`}}
                                        // onClick={() => this.openPreivewImage()}
                                    ></div>
                                </div>
                            </div>
                            
                        </div>

                        <div className='manage-specialty-editor my-3'>
                            <MdEditor 
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange} 
                                value={this.state.contentMarkdown ? this.state.contentMarkdown : ''}
                            />
                        </div>

                        <div className='my-3'>
                            <button 
                                className='btn btn-primary create-specialty'
                                onClick={() => this.handleSave()}
                            >Save</button>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
