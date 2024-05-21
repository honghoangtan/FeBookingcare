import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './UserManage.scss'

import { getAllUser, deleteUser, createNewUser, updateUser } from '../../services/userService'
import { toast } from 'react-toastify';

import ModalAddUser  from './ModalAddUser';
import ModalEditUser from './ModalEditUser'

class UserManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            modalDataUser: {}
        }
    }

    // async componentDidMount() {
    //    await this.getAllUser()
    // }

    // handleDeleteUser = async (user) => {
    //     let res = await deleteUser(user)

    //     if (res && res.EC === 0) {
    //         toast.success(res.EM)
    //         await this.getAllUser()
    //     } else {
    //         toast.error(res.EM)
    //     }
    // }

    handleAddNewUser = async () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            modalDataUser: user
        })
    }

    updateUser = async (data) => {

        console.log('call api from children')
        let res = await updateUser(data)

        if (res && res.EC === 0) {
            await this.getAllUser()

            this.setState({
                isOpenEditModal: false
            })
        } else {
            alert(res.EM)
        }
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    createNewUser = async (data) => {
        console.log('>>> CHECK DATA GROM CHILDRENS: ', data)
        let res = await createNewUser(data)

        if (res && res.EC === 0) {
            await this.getAllUser()

            this.setState({
                isOpenModal: false
            })
        } else {
            alert(res.EM)
        }
    }

    // getAllUser = async () => {
    //     let data = await getAllUser('ALL')

    //     if (data && data.EC === 0) {
    //         this.setState({
    //             arrUsers: data.DT
    //         }, () => {
    //             console.log('---')
    //             console.log('CHECK DATA USER AFTER SET: ', this.state.arrUsers)
    //         })
    //     }
    // }


    render() {

        let arrUser = this.state.arrUsers

        return (
            <div className="users-container">
                <div className='container'>
                    <div className='row'>
                        <div className='title text-center'>
                            Manage users with REACT
                        </div>
                    </div>
                    

                    <div className="my-3">
                        <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                            <i className='fas fa-plus mx-1'></i>
                            Add New User:
                        </button>
                    </div>
                        
                    <div className='row'>

                        <div className='users-table'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Email</th>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Address</th>
                                            <th>Phonennumber</th>
                                            <th>Gender</th>
                                            <th>Image</th>
                                            <th>RoleId</th>
                                            <th>PositionId</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        { arrUser && arrUser.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phonenumber}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.image}</td>
                                                    <td>{item.roleId}</td>
                                                    <td>{item.positionId}</td>
                                                    <td className='d-flex'>
                                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                        <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    
                                </table>
                        </div>
                    </div>
                </div>
                

                <ModalAddUser 
                    isOpen = {this.state.isOpenModal}
                    toggleFromParents = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />

                {this.state.isOpenEditModal && 
                    <ModalEditUser 
                        isOpen = {this.state.isOpenEditModal}
                        toggleFromParents = {this.toggleUserEditModal}
                        modalDataUser = {this.state.modalDataUser}
                        updateUser = {this.updateUser}
                    />
                }

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
