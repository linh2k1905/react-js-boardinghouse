import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../utils';
import * as actions from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUserService } from '../../services/userService'
import { add } from 'lodash';
class ModalUpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            userId: '',
            lastName: '',
            address: '',
            image: '',
            tel: '',
            roleId: '',
            isOpen: false,
            previewImageURL: '',

            action: CRUD_ACTIONS.CREATE,
            userInfo: {}




        };


    }
    async componentDidMount() {

        let { userInfo } = this.props;
        if (userInfo) {
            this.setState({
                userInfo: userInfo,
                userId: userInfo.id,
                roleId: userInfo.roleId
            })

        };

    }
    componentDidUpdate(prevProps, prevState, snapsot) {



    }


    toggle() {
        this.props.toggleModalUser();


    }


    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        console.log('check state change', copyState[id]);
        this.setState({
            ...copyState
        })

    }
    checkValidInput = () => {

        let isValid = true;
        let arrCheck = [
            'firstName',
            'userId',
            'lastName',
            'address',
            'image',
            'tel',

        ]
        if (!this.state.userId) {
            isValid = false;

            alert('Please login to post the infomation');
            this.props.history.push('/login');


        }
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This required ' + arrCheck[i]);
                break;
            }
        }
        return isValid;

    }
    handleSavePost = async () => {


        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { firstName, userId, lastName, address, image, tel, roleId } = this.state;
        console.log(this.state);
        let res = await editUserService({
            id: userId,
            roleId: roleId,
            lastName: lastName,
            firstName: firstName,
            tel: tel,
            image: image,
            address: address

        });
        console.log(res);



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

    render() {
        let { lastName, firstName, tel, address, image, previewImageURL, userInfo, userId } = this.state
        console.log(this.state);
        return (

            <Modal
                centered={true}
                size={'lg'}
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
            >
                <ModalHeader><FormattedMessage id='system.user-manage.edit-user' /></ModalHeader>
                <ModalBody>
                    <form>
                        <div className='row'>
                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.user-manage.firstname' /></label>
                                <input type='text'
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    value={firstName}



                                />
                                <input hidden onChange={(event) => this.onChangeInput(event, 'userId')}
                                    value={userId}


                                />

                            </div>
                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.user-manage.lastname' /></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    value={lastName}

                                />
                            </div>





                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.user-manage.address' /></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                    value={address}



                                />

                            </div>

                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.user-manage.mobile' /></label>
                                <input
                                    type='text'

                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'tel')}
                                    value={tel}



                                />

                            </div>


                            <div className='col-3 input-user'>

                                <label><FormattedMessage id='system.post-manage.image' /></label><br />
                                <input
                                    type='file'
                                    id='load-image'
                                    hidden
                                    onChange={(event) => this.handleOnChangeImage(event)}

                                />
                                <label htmlFor='load-image'
                                    className='load-image'


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
                                onClick={() => this.handleSavePost()}


                            ><FormattedMessage id='system.user-manage.save' /> </button>
                        </div>

                    </form>

                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={() => this.toggle()}
                    ><FormattedMessage id='common.close' /></button>
                </ModalFooter>

            </Modal>

        );
    }


}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        typeHouseRedux: state.admin.typeHouses,
        citiesRedux: state.admin.cities,
        ownerRedux: state.admin.owner,
        postRedux: state.admin.posts,
        userInfo: state.user.userInfo


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getOwner: () => dispatch(actions.fetchOwner()),
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getAllPost: () => dispatch(actions.fetchAllPost()),
        editPostRedux: (data) => dispatch(actions.fetchEditPost(data))



    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser));