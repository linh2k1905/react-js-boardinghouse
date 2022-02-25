import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';



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
            action: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {


        this.props.getTypeHouseStart();
        this.props.getCityStart();
        this.props.getOwner();
        this.props.getAllPost()

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
                userArray: this.props.ownerRedux

            })
        }
        if (prevProps.postRedux != this.props.postRedux) {

            this.setState({
                listHouses: this.props.postRedux

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

    handleSavePost = () => {


        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { action, name, userId, cityId, typeHouseId, price, address, image, area, lat, lang, descVi, descEn } = this.state;
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
        // if (action === CRUD_ACTIONS.EDIT) {
        //     this.props.editAUserRedux({
        //         id: this.state.userEditId,
        //         firstName: this.state.firstName,
        //         lastName: this.state.lastName,
        //         password: this.state.password,
        //         email: this.state.email,
        //         tel: this.state.tel,
        //         address: this.state.address,
        //         roleId: this.state.roleId,
        //         image: this.state.image


        //     })
        // }

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


    }
    handleEditPost = (house) => {
        this.props.editPost(house)
        console.log(house)

    }
    render() {

        let language = this.props.language;
        let typeHouses = this.state.typeHouseArray;
        let cities = this.state.cityArray;
        let users = this.state.userArray;
        let houses = this.state.listHouses;
        let { name, userId, cityId, typeHouseId, address, price, area, lat, lang, descVi, descEn } = this.state;
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
                            <select
                                className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, "userId")
                                }}
                                value={userId}


                            >
                                <option value="" selected disabled hidden>Choose here</option>
                                {users && users.length > 0 &&
                                    users.map((item, index) => {

                                        return (


                                            <option
                                                value={item.id}
                                            >{item.firstName}</option>

                                        )


                                    })
                                }

                            </select>
                        </div>
                        <div className='col-3 input-user'>
                            <label><FormattedMessage id='system.post-manage.cities' /></label>
                            <select
                                className="form-control"
                                onChange={(event) => this.onChangeInput(event, 'cityId')}
                                value={cityId}



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
                <div className='col-12 mb5'>
                    <table className="TableManage">
                        <tr>
                            <th>User</th>
                            <th>Adrress</th>
                            <th>Owner</th>
                            <th>CreateDate</th>
                            <th>Action</th>

                        </tr>
                        {houses && houses.length > 0 &&
                            houses.map((item, index) => {
                                return (

                                    <>


                                        <tr id={index}>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.User.firstName}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleEditPost(item)}
                                                >
                                                    <i className="fas fa-edit"></i> </button>
                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeletePost(item)}
                                                >
                                                    <i className="fas fa-trash-alt"></i></button>
                                            </td>


                                        </tr>



                                    </>
                                )
                            })
                        }

                    </table>



                </div>


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
        postRedux: state.admin.posts


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTypeHouseStart: () => dispatch(actions.fetchTypeHouseStart()),
        getCityStart: () => dispatch(actions.fetchCitiesStart()),
        getOwner: () => dispatch(actions.fetchOwner()),
        createNewPostRedux: (data) => dispatch(actions.createNewPost(data)),
        getAllPost: () => dispatch(actions.fetchAllPost()),
        editPost: (item) => dispatch(actions.fetchEditPost(item)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManage);
