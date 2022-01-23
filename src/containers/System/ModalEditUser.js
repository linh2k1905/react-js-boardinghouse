
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

    }




    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: '12345',
                address: user.address
            })
        }
        console.log("mount edit modal", this.props.currentUser);
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
        let arrInput = ['id', 'email', 'password', 'lastName', 'firstName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            console.log(this.state[arrInput[i]]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Không nên để trống ' + arrInput[i]);
                break;
            }
        }
        console.log(isValid);
        return isValid;
    }
    handleSaveUser = () => {
        //console.log("modal state", this.state);
        //console.log(" props child: ", this.props);
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            console.log(this.state);
            this.props.editUser(this.state);


            // console.log(" Call api")
            // console.log('modal state', this.state)

        }

    }


    render() {
        console.log('check props from parents', this.props);
        //console.log('check props open', this.props.isOpen)
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'

            >
                <ModalHeader toggle={() => { this.toggle() }}> Cập nhật thông tin người dùng</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>
                                Email
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Password
                            </label>
                            <input type='password'
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Họ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>
                                Tên
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>
                                Địa chỉ
                            </label>
                            <input type='text'
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"

                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Đóng</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
