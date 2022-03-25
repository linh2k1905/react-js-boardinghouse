import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHouse.scss'
import { getHouseServiceById, getAllUser, handleGetInfoBooking, handlePostComment, handelGetAllCommentByHouseId } from '../../../services/userService';
import { MapContainer, TileLayer, Marker, Popup, Map } from 'react-leaflet';
import Schedule from './Schedule';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailHouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailHouse: {},
            isOpenFinder: false,
            listHouseFiler: [],
            isOpenModel: false,
            owner: {},
            comment: '',
            allcomments: [],
            position: [51.505, -0.09],
            bound: {}


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
            if (this.state.detailHouse && this.state.detailHouse.User.id) {
                let user = await handleGetInfoBooking(this.state.detailHouse.id, this.state.detailHouse.User.id);

            }

        }

        let allcomments = await handelGetAllCommentByHouseId(this.state.detailHouse.id);
        if (allcomments) {
            this.setState({
                allcomments: allcomments.comments

            })
        }


    }
    componentDidUpdate(prevProps, prevState, snapsot) {

    }
    isSearchCheck = (isOpenFinder) => {
        this.setState({
            isOpenFinder: isOpenFinder

        })
    }
    listHouseFilerFunction = (value) => {
        this.setState({
            listHouseFiler: value
        })

    }
    handleComment = (event) => {
        this.setState({
            comment: event.target.value
        })

    }
    handleCommentPost = async () => {
        let { userInfo } = this.props;
        let house = this.state.detailHouse;
        let content = this.state.comment;
        if (userInfo.id) {
            let res = await handlePostComment({
                userId: userInfo.id,
                houseId: house.id,
                content: content


            })
        }
        alert('Vui lòng đăng nhập để bình luận');


    }

    render() {
        let { isOpenFinder, owner } = this.state;
        let { allcomments } = this.state;

        let imagebase64 = ''
        if (this.state.detailHouse.User && this.state.detailHouse.User.image)
            imagebase64 = new Buffer(this.state.detailHouse.User.image, 'base64').toString('binary');
        else {
            imagebase64 = ''
        };
        let { City, name, User, address, area, descriptionEn, descriptionVi, price } = this.state.detailHouse;
        let { position } = this.state;
        return (
            <React.Fragment>
                <HomeHeader
                    isOpenFinder={isOpenFinder}
                    isSearchCheck={this.isSearchCheck}
                    listHouseFilerFunction={this.listHouseFilerFunction}
                />
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
                                <span>Mô tả</span>
                                <div>{descriptionEn ? descriptionEn : ''}
                                </div>
                                {descriptionVi ? descriptionVi : ''}
                            </div>


                        </div>






                        <div className='schedule-owner'>


                            <h3><FormattedMessage id="common.infoOwner" /> </h3>
                            <p><FormattedMessage id="system.user-manage.firstname" /> {User ? User.firstName : ''} {User ? User.lastName : ''}</p>
                            <p><FormattedMessage id="system.user-manage.mobile" /> {User ? User.tel : ''}</p>
                            <p><FormattedMessage id="system.user-manage.address" /> {User ? User.address : ''}</p>


                            <Schedule
                                ownerIdFromParent={User && User.id ? User.id : 0}
                                isOpenModel={this.state.isOpenModel}
                                handleOnClickSchedule={this.handleOnClickSchedule}
                                detailHouse={this.state.detailHouse}
                                owner={owner}

                            />



                        </div>




                    </div>

                    <div className='title md-20'>Xem vị trí nhà trọ trên bản đồ </div>
                    <div className='map-detail-house'>
                        <MapContainer
                            center={this.state.position}
                            zoom={13} scrollWheelZoom={false}
                            style={{ width: '100%', height: '99vh' }}
                            bounds={''}
                        >

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                            />
                            <Marker position={this.state.position}>
                                <Popup>
                                    {address}
                                </Popup>
                            </Marker>

                        </MapContainer>
                    </div>
                    <div className='comment-house'>
                        <div className='title-comment'><p>Comments about post</p></div>
                        <div className='form-group'> <form>
                            <div className='row'>
                                <div className='col-8'>
                                    <input
                                        type='text'
                                        className='form-control '
                                        placeholder='Please comment about your thinking'
                                        onChange={(event) => this.handleComment(event)}
                                    ></input>
                                </div>
                                <button

                                    className='btn btn-primary col-1'
                                    onClick={() => this.handleCommentPost()}
                                >Post</button>
                            </div>
                        </form>
                        </div>
                        <div className='all-comments'>
                            <div className='title'>Tất cả bình luận</div>

                            {allcomments && allcomments.length > 0 &&
                                allcomments.map((item, index) => {



                                    return (

                                        <div>
                                            <div className='name-commenter'>
                                                {item.User.firstName + " " + item.User.lastName}: {item.content}
                                            </div>


                                        </div>

                                    )
                                })

                            }


                        </div>
                    </div>

                    <div><HomeFooter /></div>
                </div>


            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHouse);
