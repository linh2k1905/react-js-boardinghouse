import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Select from 'react-select';
import PostTable from './PostTable';

class PostManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            cityArray: [],
            typeHouseArray: [],
            listHouses: [],
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
            idHouseEdit: '',
            selectedOption: ''
        }
    }
    buidDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.value = item.id;
                obj.label = `${item.email}`
                result.push(obj);
            })

        }
        return result;

    }
    async componentDidMount() {


        this.props.getTypeHouseStart();
        this.props.getCityStart();
        this.props.getOwner();
        this.props.getAllPost();
        if (this.props.userInfo && this.props.userInfo.roleId === 2) {
            console.log(this.props.userInfo);
            this.setState({
                selectedOption: {
                    value: this.props.userInfo.id,
                    label: this.props.userInfo.email,
                },
                userId: this.props.userInfo.id
            })
        }

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
    checkValidInput = () => {
        let isValid = true;
        let arrCheck = [
            'name',
            'userId',
            'cityId',
            'typeHouseId',
            'price',
            'address',
            'image',
            'area',
            'previewImageURL',
            'lat',
            'lang',
            'descVi',
            'descEn'
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This required ' + arrCheck[i]);
                break;
            }
        }
        return isValid;

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
    onChangeInput = (event, inputId) => {

        let copyState = { ...this.state }
        copyState[inputId] = event.target.value
        this.setState({
            ...copyState

        })
        console.log(this.state);



    }
    handleEditPost = (house) => {

        let imagebase64 = '';
        if (house.image) {
            imagebase64 = new Buffer(house.image, 'base64').toString('binary');

        }
        this.setState({
            idHouseEdit: house.id,
            name: house.name,
            userId: house.idUser,
            cityId: house.idCity,
            typeHouseId: house.idTypeHouse,
            price: house.price,
            address: house.address,
            image: house.image,
            area: house.area,
            lat: house.lat,
            lang: house.lang,
            descEn: house.descriptionEn,
            descVi: house.descriptionVi,
            action: CRUD_ACTIONS.EDIT,
            previewImageURL: imagebase64,
        })



    }
    handleSavePost = () => {


        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { action, name, userId, cityId, typeHouseId, price, address, image, area, lat, lang, descVi, descEn, idHouseEdit, selectedOption } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewPostRedux({
                name: name,
                userId: userId,
                cityId: cityId,
                typeHouseId: typeHouseId,
                price: price,
                address: address,
                image: image,
                area: area,
                lat: lat,
                lang: lang,
                descEn: descEn,
                descVi: descVi

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {




            this.props.editPostRedux({
                name: this.state.name,
                price: this.state.price,
                address: this.state.address,
                area: this.state.area,
                lat: this.state.lat,
                lang: this.state.lang,
                descEn: this.state.descEn,
                descVi: this.state.descVi,
                id: this.state.idHouseEdit

            })







        }

    }
    handleOnChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
            userId: selectedOption.value
        })
    }
    render() {

        let language = this.props.language;
        let typeHouses = this.state.typeHouseArray;
        let cities = this.state.cityArray;
        let users = this.state.userArray;
        let houses = this.state.listHouses;
        let { name, userId, cityId, typeHouseId, address, price, area, lat, lang, descVi, descEn, action, selectedOption } = this.state;
        return (
            <div className='container'>
                <div className="title" ><FormattedMessage id='system.post-manage.post-manage' /></div>

                <form>
                    <div className='row'>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.name' /></label>
                            <input type='text'
                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'name')}
                                value={name}

                            />

                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.users' /></label>

                            <Select
                                options={users}
                                value={selectedOption}
                                onChange={this.handleOnChange}
                                isDisabled={this.props.userInfo.roleId === 2 ? true : false}
                            />

                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.cities' /></label>
                            <select
                                className="form-control"
                                onChange={(event) => this.onChangeInput(event, 'cityId')}
                                value={cityId}

                                disabled={action === CRUD_ACTIONS.EDIT ? true : false}


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
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.lat' /></label>
                            <input type='text'
                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'lat')}
                                value={lat}

                            />

                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.lang' /></label>
                            <input type='text'
                                className='form-control'
                                onChange={(event) => this.onChangeInput(event, 'lang')}
                                value={lang}

                            />

                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"><FormattedMessage id='system.post-manage.descEn' /></label>
                            <textarea
                                class="form-control"
                                rows="3"
                                onChange={(event) => this.onChangeInput(event, 'descEn')}
                                value={descEn}

                            ></textarea>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"><FormattedMessage id='system.post-manage.descVi' /></label>
                            <textarea
                                class="form-control"
                                rows="3"
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

                <PostTable
                    handleEditPost={this.handleEditPost}
                />


            </div >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);
