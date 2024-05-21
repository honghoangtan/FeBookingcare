import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


import { FormattedMessage } from 'react-intl';

import { postVerifyBookAppointment } from '../../services/userService'

import HomeHeader from '../HomePage/HomeHeader';


// import './VerifyEmail.scss'


class VerifyEmail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            statusVerify: false,
            EC: 2
        }
    }

    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)

            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.EC === 0) {
                this.setState({
                    statusVerify: true,
                    EC: res.EC
                })
            } else {
                this.setState({
                    statusVerify: true,
                    EC: 2
                })
            }

        }

        

        if (this.props.match && this.props.match.params) {
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }


    render() {

        let { statusVerify, EC } = this.state

        return (
            <div>
                <HomeHeader isShowBanner={false} />
                { statusVerify === false ? 
                    <div>Loading data...</div>
                    :
                    <div>
                        { EC === 0 ?
                            <div className='title'>Xác nhận lịch hẹn thành công!</div>
                            :
                            <div className='title'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
