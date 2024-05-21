import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import './Specialty.scss'

import Slider from "react-slick";

import { getSpecialty } from '../../../services/userService'

import { withRouter } from 'react-router';




import specialty from '../../../assets/specialty/xuong khop.png'

class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getSpecialty(5)

        if (res && res.EC === 0) {
            this.setState({
                dataSpecialty: res.DT
            })
        }
    }

    // componentDidUpdate() {
    //     if (prevProps.language !== this.props.language) {
    //         this.setState({
    //             genderArr: this.props.language
    //         })
    //     }
    // }

    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {

        console.log(">>>> CHECK STATE IN SPECIALTY: ", this.state)
        let { dataSpecialty } = this.state

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.title-specialties" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body section-specialty'>
                        <Slider {...this.props.settings}>
                            {/* <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <div>Co xuong khop</div>
                            </div> */}

                            { dataSpecialty && dataSpecialty.length > 0  &&
                                dataSpecialty.map((item, index) => {

                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div 
                                                className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})`}}
                                            ></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
