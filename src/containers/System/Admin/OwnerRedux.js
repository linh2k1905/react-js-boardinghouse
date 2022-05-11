import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageOwner from './TableManageOwner';
class OwnerRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roleArray: [],
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            tel: '',
            address: '',
            roleId: '',
            image: '',
            previewImageURL: '',
            action: CRUD_ACTIONS.CREATE,
            userEditId: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getRoleStart();



    }
    componentDidUpdate(prevProps, prevState, snapsot) {

        if (prevProps.roleRedux !== this.props.roleRedux) {

            this.setState({
                roleArray: this.props.roleRedux
            })
        }
        if (prevProps.listusers !== this.props.listusers) {

            let arrRole = this.props.roleRedux
            this.setState({


                firstName: '',
                lastName: '',
                password: '',
                email: '',
                tel: '',
                address: '',
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].name : '',
                image: '',
                previewImageURL: '',
                action: CRUD_ACTIONS.CREATE
            })


        }

    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;

        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImageURL: objectURL,
                image: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {


        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewOwnerRedux({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                tel: this.state.tel,
                address: this.state.address,
                roleId: this.state.roleId,
                image: this.state.image

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAOwnerRedux({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                tel: this.state.tel,
                address: this.state.address,
                roleId: this.state.roleId,
                image: this.state.image


            })
        }

    }
    handleEditUserFromParent = (user) => {
        let imagebase64 = '';
        if (user.image) {
            imagebase64 = new Buffer(user.image, 'base64').toString('binary');

        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            tel: user.tel,
            address: user.address,
            roleId: user.roleId,
            image: '',
            previewImageURL: imagebase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id

        })
    }
    checkValidInput = () => {
        let isValid = true;
        let arrCheck = ['firstName', 'lastName', 'password', 'email', 'tel', 'address', 'roleId']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Không được để trống ' + arrCheck[i]);
                break;
            }
        }
        return isValid;

    }
    onChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })

    }
    render() {
        let roles = this.state.roleArray;
        let language = this.props.language;
        let { firstName, lastName, password, email, tel, address, roleId } = this.state;

        return (
            <div className='container'>
                <div className="title" ><FormattedMessage id='menu.system.system-administrator.user-owner' /></div>

                <form>
                    <div className='row'>
                        <div className='col-4 input-user'>
                            <label><FormattedMessage id='system.user-manage.lastname' /></label>
                            <input type='text'
                                className='form-control'
                                value={lastName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'lastName');
                                }}

                            />
                        </div>
                        <div className='col-4 input-user'>
                            <label><FormattedMessage id='system.user-manage.firstname' /></label>
                            <input
                                type='text'
                                className='form-control'
                                value={firstName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'firstName');
                                }}
                            />
                        </div>
                        <div className='col-4 input-user'>
                            <label><FormattedMessage id='system.user-manage.email'
                            /></label>
                            <input
                                type='email'
                                className='form-control'
                                value={email}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'email');
                                }}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </div>

                        <div className='col-12 input-user'>
                            <label><FormattedMessage id='system.user-manage.address' /></label>
                            <input
                                type='text'
                                className='form-control'
                                value={address}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'address');

                                }}
                            />
                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.user-manage.mobile' /></label>
                            <input
                                type='tel'
                                className='form-control'
                                value={tel}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'tel');
                                }}

                            />

                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.user-manage.usertype' /></label>
                            <select
                                className="form-control"

                                onChange={(event) => {
                                    this.onChangeInput(event, 'roleId');
                                }}
                                value={roleId}
                            >
                                <option value="" selected disabled hidden>Choose here</option>
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {

                                        return (


                                            <option key=
                                                {index}
                                                value={item.id}
                                            >{language === LANGUAGES.VI ? item.roleVi : item.name}</option>

                                        )


                                    })
                                }

                            </select>
                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.user-manage.password' /></label>
                            <input type='password'
                                className='form-control'
                                value={password}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'password');
                                }}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                            />

                        </div>
                        <div className='col-3 input-user'>

                            <label><FormattedMessage id='system.user-manage.image' /></label><br />
                            <input
                                type='file'
                                id='load-image'
                                className='form-control'
                                hidden
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                            <label htmlFor='load-image'


                            >
                                <FormattedMessage id='system.user-manage.upload' /> <i className="fas fa-image"></i></label>

                        </div>
                        <div className='preview-image-container'>
                            <div className={this.state.previewImageURL ? 'preview-image' : ''}
                                style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                            >

                            </div>

                        </div>
                    </div>
                    <div className='col-12 mb-3'>

                        <button
                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning col-1 ' : 'btn btn-primary col-1 btn-save'}


                            onClick={() => this.handleSaveUser()}
                        ><FormattedMessage id='system.user-manage.save' /> </button>
                    </div>

                </form>
                <div className='col-12 mb-5'>
                    <TableManageOwner
                        handleEditUserFromParentKey={this.handleEditUserFromParent}
                        action={this.state.action}
                    />
                </div>

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        roleRedux: state.admin.roles,
        listusers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewOwnerRedux: (data) => dispatch(actions.createNewUser(data)),
        editAOwnerRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerRedux);
