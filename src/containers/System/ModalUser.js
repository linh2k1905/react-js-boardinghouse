
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { CommonUtils } from '../../utils';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import {
    getAllUser,
    createNewUserService,
} from '../../services/userService';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            roleId: '',
            tel: '',
            image: '',
            previewImage: '',
            isOpenLabelAvatar: true
        }


    }



    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleParent()
    }
    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'lastName', 'firstName', 'address', 'tel', 'roleId'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Không nên để trống ' + arrInput[i]);
                break;
            }
        }
        console.log(isValid);
        return isValid;
    }
    handleAddNewUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            let res = await createNewUserService(this.state);
            console.log(res);
            if (res.errorCode === 0) {
                toast.success(res.messageCode);
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    roleId: '',
                    tel: '',
                    image: '',
                    previewImage: '',
                    isOpenLabelAvatar: true

                });
                this.toggle();
                this.props.history.push('/login');
            }
            else {
                toast.error(res.messageCode);
            }




        }

    }
    setRoleState = (event) => {
        console.log(event.target.value);
        this.setState({
            roleId: event.target.value
        })

    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;

        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectURL,
                image: base64,
                isOpenLabelAvatar: false
            })
        }
    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errorCode == 0) {
            this.setState(
                {
                    arrUser: response.users
                })

        }
    }
    createNewUser = async (data) => {

        console.log("check data from child", data);
        try {
            let response = await createNewUserService(data);

            if (response && response.errorCode !== 0) {

                alert(response.messageCode);
            }

            console.log('response', response);
        } catch (error) {
            console.log(error);
        }

    }

    render() {

        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'

            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    <FormattedMessage id="header.signup" />
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='col-12 input-user '>


                            <input
                                type='file'
                                id='load-image'
                                hidden
                                onChange={(event) => this.handleOnChangeImage(event)}

                            />
                            {this.state.isOpenLabelAvatar === true ?
                                <label htmlFor='load-image'
                                    className='load-image col-6'


                                >
                                    <i className="fas fa-camera fa-6x"></i>
                                </label> :

                                <label htmlFor='load-image'
                                    className='load-image col-6'
                                    hidden

                                >
                                    <i className="fas fa-camera fa-6x"></i>
                                </label>
                            }



                        </div>

                        <div className='preview-image-container col-6 '
                            onClick={() => { }}
                        >
                            <div className={this.state.previewImageURL ? 'preview-image' : ''}
                                style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                            >

                            </div>
                            <label><FormattedMessage id='common.avatar' /></label><br />

                        </div>

                        <div className='input-container'>
                            <label>
                                Email
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Password
                            </label>
                            <input type='password'
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                                className='form-control'
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Họ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}
                                className='form-control'
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Tên
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}
                                className='form-control'
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>
                                Địa chỉ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                                className='form-control'
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Tel
                            </label>
                            <input
                                type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "tel")}
                                value={this.state.tel}
                                className='form-control'
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Vai trò
                            </label>
                            <select className='form-control'
                                onChange={(event) => this.setRoleState(event)}
                            >
                                <option value={3}>Chọn kiểu người dùng</option>
                                <option value={3}>Bạn cùng phòng</option>
                                <option value={4}>Khách thuê</option>
                            </select>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>
                        Lưu
                    </button>
                    <button className='px-3' onClick={() => { this.toggle() }}>Đóng</button>
                </ModalFooter>
            </Modal>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalUser));
