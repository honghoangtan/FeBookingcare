import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

class ModalEditUser extends Component {

    constructor(props) {
        super(props) ;

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: ''
        }
    }
    

    componentDidMount() {
        let user = this.props.modalDataUser

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender
            })
        }

        console.log('-------')
        console.log('STATE AFTER MOUNT: ', this.state)
        console.log('-------')
    }

    handleOnchangeInput = (value, name) => {
        const _copyState = _.cloneDeep({...this.state})

        _copyState[name] = value

        this.setState({
            ..._copyState
        })
    }

    toggle = () => {
        this.props.toggleFromParents()
    }

    checkValidInput = () => {
        let isValid = true
        const arrInput = ['firstName', 'lastName', 'address', 'phonenumber']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Empty input ${arrInput[i]}`)
                break
            }
        }

        return isValid
    }

    handleUpdata = () => {
        console.log('CHECK DATA UPDATA: ', this.props.modalDataUser)

        const isValid = this.checkValidInput()

        if (isValid) {

            this.props.updateUser(this.state)
            
        }
    }

    render() {
        return (
            <div>
                <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                size='lg'
                centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Edit User:</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div className="col-6">
                                    <label htmlFor="inputFirstname" className="form-label">Firstname</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputFirstname" 
                                        name="firsname" 
                                        value={this.state.firstName}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'firstName')}
                                        />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="inputLastname" className="form-label">Lastname</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputLastname" 
                                        name="lastname" 
                                        value={this.state.lastName}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'lastName')}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="inputAddress" className="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress" 
                                        placeholder="1234 Main St"
                                        name="address" 
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'address')}
                                        />
                                </div>
                                <div className="col-8">
                                    <label htmlFor="inputPhonenumber" className="form-label">Phonenumber</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAPhonenumber"
                                        name="phonenumber" 
                                        value={this.state.phonenumber}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'phonenumber')}
                                        />
                                </div>
                                <div className="col-md-4    ">
                                    <label htmlFor="inputState" className="form-label">Sex</label>
                                    <select name="gender" className="form-select" value={this.state.gender} 
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'gender')}>
                                        <option selected>Choose...</option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => this.handleUpdata()}>
                            Update
                        </Button>{' '}

                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
