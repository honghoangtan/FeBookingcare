import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

class ModalAddUser extends Component {

    constructor(props) {
        super(props) ;

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
        }
    }
    

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParents()
    }

    handleOnchangeInput = (value, name) => {
        const _copyState = _.cloneDeep({...this.state})

        _copyState[name] = value

        this.setState({
            ..._copyState
        })
    }

    checkValidInput = () => {
        let isValid = true
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Empty input ${arrInput[i]}`)
                break
            }
        }

        return isValid
    }

    handleAddNewUser = async () => {

        let check = this.checkValidInput()
        
        if (check) {

            if (this.state.gender === '1' || this.state.gender === '0') {
                // call api
                console.log('>>> CHECK STATE HANDLE ADD: ', this.state)
                this.props.createNewUser(this.state)

                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phonenumber: '',
                    gender: '',
                })

            } else {
                alert('Empty input sex')
            }
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
                    <ModalHeader toggle={() => this.toggle()}>Create New USer</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        class="form-control"
                                        id="inputEmail4" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'email')}/>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        id="inputPassword4" 
                                        name="password" 
                                        value={this.state.password}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'password')}/>
                                </div>
                                <div class="col-6">
                                    <label for="inputFirstname" class="form-label">Firstname</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="inputFirstname" 
                                        name="firsname" 
                                        value={this.state.firstName}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'firstName')}/>
                                </div>
                                <div class="col-6">
                                    <label for="inputLastname" class="form-label">Lastname</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="inputLastname" 
                                        name="lastname" 
                                        value={this.state.lastName}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'lastName')}
                                    />
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress" class="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="inputAddress" 
                                        placeholder="1234 Main St"
                                        name="address" 
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'address')}/>
                                </div>
                                <div class="col-8">
                                    <label for="inputPhonenumber" class="form-label">Phonenumber</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="inputAPhonenumber"
                                        name="phonenumber" 
                                        value={this.state.phonenumber}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'phonenumber')}/>
                                </div>
                                <div class="col-md-4    ">
                                    <label for="inputState" class="form-label">Sex</label>
                                    <select name="gender" class="form-select" value={this.state.gender}
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'gender')}>
                                        <option selected>Choose...</option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                {/* <div class="col-md-3">
                                    <label for="roleState" class="form-label">Role</label>
                                    <select name="role" class="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Patient</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => this.handleAddNewUser()}>
                            Add new
                        </Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                            Cancel
                        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);
