import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import './MedicalFacility.scss'

import Slider from "react-slick";

import specialty from '../../../assets/specialty/xuong khop.png'

import { getClinic } from '../../../services/userService'

import { withRouter } from 'react-router';


class MedicalFacility extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getClinic()

        if (res && res.EC === 0) {
            this.setState({
                dataClinic: res.DT
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {

        let { dataClinic } = this.state

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Co so y te noi bat</span>
                        <button className='btn-section'>Xem them</button>
                    </div>

                    <div className='section-body section-medical'>
                        <Slider {...this.props.settings}>
                            { dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                            <div 
                                                className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})`}}
                                            >
                                            </div>
                                            <div className='title-child'>{item.name}</div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
