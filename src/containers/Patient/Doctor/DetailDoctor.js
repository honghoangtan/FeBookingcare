import React, { Component } from 'react';
import { connect } from "react-redux";

import HomeHeader from '../../HomePage/HomeHeader';

import './DetailDoctor.scss'

import { getDetailInforDoctor } from '../../../services/userService'

import { languages } from '../../../utils'

import DoctorSchedule from './DoctorSchedule';

import DoctorExtraInfor from './DoctorExtraInfor';


class DetailDoctor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            this.setState({
                currentDoctorId: id
            })


            let res = await getDetailInforDoctor(id)

            if (res && res.EC === 0) {
                this.setState({
                    detailDoctor: res.DT,
                })
            }

            console.log('>>> CHECK DETAIL DOCTOR FROM ID: ', res)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        // Cần thằng này để lấy ra id được query
        console.log(this.props.match.params.id)

        console.log(">>>> CHECK STATE DETAIL DOCTOR: ", this.state.detailDoctor  )        

        let nameVi = '', nameEn = ''

        if (this.state.detailDoctor && this.state.detailDoctor.positionData) {

            nameVi = `${this.state.detailDoctor.positionData.valueVi}, ${this.state.detailDoctor.lastName} ${this.state.detailDoctor.firstName}`
            nameEn = `${this.state.detailDoctor.positionData.valueEn}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName}`

            console.log(">>> CHECK NAME VI, EN: ", nameVi, nameEn)
        }


        return (
            <>
                <HomeHeader isShowBanner={false} />
                
                
                <div className='doctor-detail-container'>

                    <div className='intro-doctor'> 
                        <div className='content-left' 
                            style={{ backgroundImage: `url(${this.state.detailDoctor && this.state.detailDoctor.image ? this.state.detailDoctor.image : ''})`}}
                        >

                        </div>

                        <div className='content-right'>
                            <div className='doctor-name'>
                               { this.props.language === languages.VI ? nameVi : nameEn}
                            </div>

                            <div className='doctor-description'>
                                { this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.description}
                            </div>
                        </div>

                    </div>

                    <div className='shedule-doctor my-3'>
                        <div className='content-left'>
                            <DoctorSchedule doctorId={this.state.currentDoctorId}/>
                        </div>

                        <div className='content-right'>
                            <DoctorExtraInfor doctorId={this.state.currentDoctorId} />
                        </div>
                    </div>
                    
                    <div className='detail-infor-doctor'>
                        { this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html: this.state.detailDoctor.Markdown.contentHTML }}>
                                
                            </div>
                        }
                    </div>

                    <div className='comment-doctor'></div>


                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
