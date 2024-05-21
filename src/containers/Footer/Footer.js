import React, { Component } from 'react';
import { connect } from "react-redux";

// import { languages } from '../../../utils'


// import { FormattedMessage } from 'react-intl';




import './Footer.scss'


class Footer extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }


    render() {

        return (
            <div className='footer-container'>
                <div className='container'>
                        <div className='content'>
                            <div className='content-up'>
                                <div className='up1'>
                                    
                                </div>
                                <div className='up2'></div>
                                <div className='up3'></div>
                            </div>
                            <div className='content-down'>asds</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
