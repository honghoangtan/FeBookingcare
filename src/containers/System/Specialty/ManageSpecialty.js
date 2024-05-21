import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


import { FormattedMessage } from 'react-intl';

import { CommonUtils } from '../../../utils'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';


import './ManageSpecialty.scss'

import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageSpecialty extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameSpecialty: '',
            preivewImgURL: '',
            imageBase64: '',
            contentMarkdown: '',
            contentHTML: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnchangeNameSpecialty = (e) => {
        this.setState({
            nameSpecialty: e
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

        const arrInput = ['nameSpecialty', 'contentMarkdown', 'contentHTML', 'imageBase64']

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
        console.log(">>> CHECK STATE: ", this.state)

        let check = this.checkValidInput()

        if (check) {
            
            let res = await createNewSpecialty({
                name: this.state.nameSpecialty,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                image: this.state.imageBase64
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
            <div className='manage-specialty-container'>
                <div className='title'>QUẢN LÝ CHUYÊN KHOA</div>

                <div className='specialty-infor my-4'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label>Tên chuyên khoa</label>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Vui lòng nhập tên chuyên khoa' 
                                    value={this.state.nameSpecialty}
                                    onChange={(e) => this.handleOnchangeNameSpecialty(e.target.value)}
                                />
                            </div>

                            <div class="col-md-6">
                                <label for="inputImage" class="form-label">Ảnh chuyên khoa</label>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
