import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";


import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { loginUser } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'abc',
            password: '12345',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnchangeInput = (e) => {
        this.setState({
            username: e
        })
    }

    handleOnchangePassword = (e) => {
        this.setState({
            password: e
        })
    }

   handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await loginUser(this.state.username, this.state.password)
            console.log(data)

            if (data && data.EC !== 0) {
                this.setState({
                    errMessage: data.EM
                })
            }

            if (data && data.EC === 0) {
                this.props.userLoginSuccess(data.DT)
            }
        } catch(e) {
            console.log('error handle login', e)
        }
   }

    handleShowPassword= () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleOnKeyDown = (e) => {
        if (e.key === 'Enter'){
            this.handleLogin()
        }
    }


    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' 
                                className='form-control' 
                                placeholder='Enter your username' 
                                value={this.state.username} 
                                onChange={(e) => this.handleOnchangeInput(e.target.value) } 
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custorm-eye-input'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' 
                                    placeholder='Enter your password' 
                                    value={this.state.password} 
                                    onChange={(e) => this.handleOnchangePassword(e.target.value)}
                                    onKeyDown={(e) => this.handleOnKeyDown(e)} 
                                />

                                <span onClick={() => this.handleShowPassword()}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with</span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
