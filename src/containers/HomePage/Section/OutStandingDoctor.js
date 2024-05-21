import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import './OutStandingDoctor.scss'

import Slider from "react-slick";

import * as actions from '../../../store/actions'

import { languages } from '../../../utils'

import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }


    handleViewDetailDoctor(item) {
        console.log('>>> CHECK VIEW INFOR: ', item)

        this.props.history.push(`/detail-doctor/${item.id}`)
    }



    render() {

        let arrDoctors = this.props.topDoctorsRedux

        let language = this.props.language

        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)


        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.out-standing-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body section-doctor'>
                        <Slider {...this.props.settings}>

                            { arrDoctors && arrDoctors.length > 0 && 
                                arrDoctors.map((item, index) => {

                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }

                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div key={index} className='section-customize' onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-boder'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor' 
                                                    style={{ backgroundImage: `url(${imageBase64})`}}></div>
                                                </div>

                                                <div className='position text-center'>
                                                    <div>{ language === languages.VI ? nameVi : nameEn}</div>
                                                    <div className='title-child'>Co xuong khop</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                
                        </Slider>
                    </div>

                </div>
            
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin2.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
