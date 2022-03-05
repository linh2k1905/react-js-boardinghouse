import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHouse.scss'
import { getHouseServiceById } from '../../../services/userService';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Schedule from './Schedule'
class DetailHouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailHouse: {}

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getHouseServiceById(this.props.match.params.id);

            if (res && res.errorCode === 0) {
                this.setState({
                    detailHouse: res.data
                })
            }
        }




    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }
    render() {

        let imagebase64 = ''
        if (this.state.detailHouse.User && this.state.detailHouse.User.image)
            imagebase64 = new Buffer(this.state.detailHouse.User.image, 'base64').toString('binary');
        else {
            imagebase64 = ''
        };
        let position = [];
        let { City, name, HouseType, User, address, area, descriptionEn, descriptionVi, id, lang, lat, price } = this.state.detailHouse;


        if (lat && lang) {
            position = [lat, lang];
        }
        else {
            position = [10.0243192, 105.7727087];
        }



        return (
            <React.Fragment>
                <HomeHeader
                    isOpenFinder={false} />
                <div className='house-detail-container'>
                    <div className='house-intro'>
                        <div className='contain-left'
                            style={{ backgroundImage: `url(${this.state.detailHouse.image})`, width: '823px', height: '300px' }}
                        >

                        </div>

                        <div className='contain-right'

                            style={{ backgroundImage: `url(${imagebase64})` }}
                        >


                        </div>
                    </div>


                    <div className='row'>


                        <div className='detail-house-info'>

                            <p className='name-house-infor'><FormattedMessage id="system.post-manage.name" />: {name}</p>
                            <p className='price-house-infor'><FormattedMessage id="system.post-manage.price" />: {price / 1000000}Triệu</p>
                            <p className='price-house-area'><FormattedMessage id="system.post-manage.area" />: {area} M2</p>
                            <div className='city-infor'><FormattedMessage id="system.post-manage.cities" />: {City ? City.name : 'Chưa xác định'} </div>

                            <p className='address-house-infor'><FormattedMessage id="system.post-manage.address" />: {address}</p>
                            <div className='desc-house'>
                                <div>{descriptionEn ? descriptionEn : ''}
                                </div>
                                {descriptionVi ? descriptionVi : ''}
                            </div>


                        </div>






                        <div className='schedule-owner'>

                            <Schedule
                                ownerIdFromParent={User && User.id ? User.id : 0}

                            />
                            <h3>Thông tin chủ trọ</h3>
                            <p><FormattedMessage id="system.user-manage.firstname" /> {User ? User.firstName : ''}</p>
                            <p><FormattedMessage id="system.user-manage.lastname" /> {User ? User.lastName : ''}</p>
                            <p><FormattedMessage id="system.user-manage.mobile" /> {User ? User.tel : ''}</p>
                            <p><FormattedMessage id="system.user-manage.address" /> {User ? User.address : ''}</p>



                        </div>



                    </div>
                    <div className='title'>Xem vị trí nhà trọ trên bản đồ </div>
                    <div className='map-detail-house'>
                        <MapContainer
                            center={position}
                            zoom={13} scrollWheelZoom={false}
                            style={{ width: '100%', height: '99vh' }}



                        >

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                            />
                            <Marker position={position}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>

                        </MapContainer>
                    </div>
                    <div className='comment-house'></div>

                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHouse);
