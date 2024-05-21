import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'


import './TableManageUser.scss'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
                // render => didUpdate
        // hien tai (this.props) va qua khu
        // []   [3]

        // [3]  [3]
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                usersRedux: this.props.usersRedux
            })
        }
    }

    handleDeleteUser = (item) => {
        this.props.deleteUserRedux(item)
    }

    handleEditUser = (item) => {
        console.log('user from child: ', item)
        this.props.handleEditUserFromParent(item)
    }

    render() {
        let arrUser = this.props.usersRedux
        return (
            <div className="users-container">
                <div className='container'>
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
                                            <th>RoleId</th>
                                            <th>PositionId</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    { arrUser && arrUser.length > 0 &&
                                            arrUser.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.firstName}</td>
                                                        <td>{item.lastName}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.phonenumber}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.roleId}</td>
                                                        <td>{item.positionId}</td>
                                                        <td className='d-flex'>
                                                            <button className='btn-edit' 
                                                                onClick={() => this.handleEditUser(item)}
                                                            >
                                                                <i className='fas fa-pencil-alt'></i>
                                                            </button>
                                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)} ><i className='fas fa-trash'></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    
                                </table>
                        </div>

                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                        
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        usersRedux: state.admin2.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser2(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
