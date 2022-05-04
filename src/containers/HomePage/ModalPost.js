import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from '../../utils';
import * as actions from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class ModalPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userId: '',
            cityId: '',
            typeHouseId: '',
            price: '',
            address: '',
            image: '',
            isOpen: false,
            area: 0,
            previewImageURL: '',
            lat: '',
            lang: '',
            descVi: '',
            descEn: '',

            action: CRUD_ACTIONS.CREATE,
            cityArray: [],
            typeHouseArray: [],
            listHouses: []




        };


    }
    componentDidMount() {
        this.props.getCityStart();
        this.props.getTypeHouseStart();
        let { userInfo, citiesRedux } = this.props;
        if (userInfo) {
            this.setState({
                userId: userInfo.id
            })

        };

        this.setState({
            typeHouseArray: this.props.typeHouseRedux,
            cityArray: citiesRedux,


        });
    }
    componentDidUpdate(prevProps, prevState, snapsot) {
        if (prevProps.typeHouseRedux != this.props.typeHouseRedux) {
            this.setState({
                typeHouseArray: this.props.typeHouseRedux

            })
        }
        if (prevProps.citiesRedux != this.props.citiesRedux) {
            this.setState({
                cityArray: this.props.citiesRedux

            })
        }
        if (prevProps.ownerRedux != this.props.ownerRedux) {

            this.setState({
                userArray: this.buidDataSelect(this.props.ownerRedux)

            })
        }
        if (prevProps.postRedux != this.props.postRedux) {

            this.setState({
                listHouses: this.props.postRedux

            })
        }
        if (prevState.idHouseEdit != this.state.idHouseEdit) {
            this.setState({
                idHouseEdit: this.state.idHouseEdit
            })
        }



    }


    toggle() {
        this.props.toggleModalPost();

    }


    onChangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        console.log(copyState[id]);
        this.setState({
            ...copyState
        })

    }
    checkValidInput = () => {

        let isValid = true;
        let arrCheck = [
            'name',

            'cityId',
            'typeHouseId',
            'price',
            'address',
            'image',
            'area',
            'previewImageURL',
            'descVi',
            'descEn'
        ]
        if (!this.props.userInfo) {
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
    handleSavePost = () => {


        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { action, name, userId, cityId, typeHouseId, price, address, image, area, descVi, descEn } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewPostRedux({
                name: name,
                userId: parseInt(userId),
                cityId: parseInt(cityId),
                typeHouseId: parseInt(typeHouseId),
                price: parseFloat(price),
                address: address,
                image: image,
                area: area,
                descEn: descEn,
                descVi: descVi,


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

    render() {
        let language = this.props.language;
        let typeHouses = this.state.typeHouseArray;
        let cities = this.state.cityArray;

        let { name, userId, typeHouseId, address, price, area, descVi, descEn, action } = this.state;
        return (

            <Modal
                centered={true}
                size={'lg'}
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
            >
                <ModalHeader className='header-post'>

                    <div className='right'>
                        <button className=' btn-close-post'
                            onClick={() => this.toggle()}
                        >
                            <span>Close</span>
                        </button>

                    </div>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className='row'>
                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.post-manage.name' /></label>
                                <input type='text'
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'name')}
                                    value={name}


                                />
                                <input hidden onChange={(event) => this.onChangeInput(event, 'userId')}
                                    value={userId}

                                />

                            </div>
                            <div className='col-12 input-user'>
                                <label><FormattedMessage id='system.post-manage.address' /></label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                    value={address}

                                />
                            </div>


                            <div className='col-3 input-user'>
                                <label><FormattedMessage id='system.post-manage.cities' /></label>
                                <select
                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'cityId')}





                                >
                                    <option value="" selected disabled hidden>Choose here</option>
                                    {cities && cities.length > 0 &&
                                        cities.map((item, index) => {

                                            return (


                                                <option key=
                                                    {index}
                                                    value={item.id}
                                                >{item.name}</option>

                                            )


                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3 input-user'>
                                <label><FormattedMessage id='system.post-manage.typeHouses'
                                /></label>
                                <select

                                    className="form-control"
                                    onChange={(event) => this.onChangeInput(event, 'typeHouseId')}
                                    value={typeHouseId}
                                    disabled={action === CRUD_ACTIONS.EDIT ? true : false}


                                >
                                    <option value="" selected disabled hidden>Choose here</option>

                                    {typeHouses && typeHouses.length > 0 &&
                                        typeHouses.map((item, index) => {

                                            return (


                                                <option key=
                                                    {index}
                                                    value={item.id}
                                                >{language === LANGUAGES.VI ? item.nameVi : item.name}</option>

                                            )


                                        })
                                    }

                                </select>
                            </div>


                            <div className='col-3 input-user'>
                                <label><FormattedMessage id='system.post-manage.price' /></label>
                                <input
                                    type='number'
                                    min="0"
                                    max="10000000"
                                    step="100000"
                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'price')}
                                    value={price}


                                />

                            </div>

                            <div className='col-3 input-user'>
                                <label><FormattedMessage id='system.post-manage.area' /></label>
                                <input
                                    type='number'

                                    className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'area')}
                                    value={area}


                                />

                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlTextarea1"><FormattedMessage id='system.post-manage.descEn' /></label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    onChange={(event) => this.onChangeInput(event, 'descEn')}
                                    value={descEn}

                                ></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1"><FormattedMessage id='system.post-manage.descVi' /></label>
                                <textarea
                                    class="form-control"
                                    rows="2"
                                    onChange={(event) => this.onChangeInput(event, 'descVi')}
                                    value={descVi}
                                ></textarea>
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
                                className={this.state.action === CRUD_ACTIONS.EDIT ? ' btn-warning col-1 ' : ' btn-primary col-1 btn-save'}
                                onClick={() => this.handleSavePost()}


                            ><FormattedMessage id='system.user-manage.save' /> </button>
                        </div>

                    </form>

                </ModalBody>




            </Modal >

        );
    }


}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        citiesRedux: state.admin.cities,
        userInfo: state.user.userInfo,
        typeHouseRedux: state.admin.typeHouses


    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),


    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalPost));