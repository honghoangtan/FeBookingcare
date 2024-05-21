import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

import './Handbook.scss'




class Handbook extends Component {

    render() {

        

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.hand-book" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>

                    <div className='section-body section-handbook'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Benh vien Huu nghi Viet Duc</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Co xuong khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Co xuong khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Co xuong khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Co xuong khop</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Co xuong khop</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
