import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailHouse.scss'
import { getHouseServiceById, getAllUser, handleGetInfoBooking, handlePostComment, handelGetAllCommentByHouseId } from '../../../services/userService';
import { MapContainer, TileLayer, Marker, Popup, Map } from 'react-leaflet';
import Schedule from './Schedule';
import HomeFooter from '../../HomePage/HomeFooter';
import { LANGUAGES } from '../../../utils';
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
            position: {}

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
            let { detailHouse } = this.state;
            if (detailHouse && detailHouse.User.id) {
                let user = await handleGetInfoBooking(this.state.detailHouse.id, this.state.detailHouse.User.id);
                let latFloat = parseFloat(detailHouse.lat);
                let langFloat = parseFloat(detailHouse.lang);
                this.setState({
                    owner: user.users,
                    position: {
                        langFloat: langFloat,
                        latFloat: latFloat
                    }

                })



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
        if (prevState.detailHouse != this.state.detailHouse) {
            this.setState({
                detailHouse: this.state.detailHouse,
            })
        }
        if (prevState.allcomments != this.state.allcomments) {
            this.setState({
                allcomments: this.state.allcomments
            })
        }

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
        alert('Vui l??ng ????ng nh???p ????? b??nh lu???n');


    }

    render() {
        let { isOpenFinder, owner, allcomments, detailHouse, position } = this.state;
        console.log('position', position);
        let imagebase64 = ''
        if (this.state.detailHouse.User && this.state.detailHouse.User.image)
            imagebase64 = new Buffer(detailHouse.User.image, 'base64').toString('binary');
        else {
            imagebase64 = ''
        };
        let { City, name, User, address, area, descriptionEn, descriptionVi, price } = this.state.detailHouse;
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
                            <p className='price-house-infor'><FormattedMessage id="system.post-manage.price" />: {price / 1000000}  Tri???u</p>
                            <p className='price-house-area'><FormattedMessage id="system.post-manage.area" />: {area} m2</p>
                            <div className='city-infor'><FormattedMessage id="system.post-manage.cities" />: {City ? City.name : 'Ch??a x??c ?????nh'} </div>

                            <p className='address-house-infor'><FormattedMessage id="system.post-manage.address" />: {address}</p>
                            <div className='desc-house'>
                                <span><FormattedMessage id="system.post-manage.desc" /></span>
                                {this.props.language === LANGUAGES.EN ?
                                    <div>{descriptionEn ? descriptionEn : ''} </div> :
                                    <div>{descriptionVi ? descriptionVi : ''}</div>
                                }



                            </div>


                        </div>






                        <div className='schedule-owner'>


                            <h3><FormattedMessage id="common.infoOwner" /> </h3>
                            <p><FormattedMessage id="system.user-manage.firstname" />: {User ? User.lastName : ''} {User ? User.firstName : ''} </p>
                            <p><FormattedMessage id="system.user-manage.mobile" />: {User ? User.tel : ''}</p>
                            <p><FormattedMessage id="system.user-manage.address" />: {User ? User.address : ''}</p>


                            <Schedule
                                ownerIdFromParent={User && User.id ? User.id : 0}
                                isOpenModel={this.state.isOpenModel}
                                handleOnClickSchedule={this.handleOnClickSchedule}
                                detailHouse={this.state.detailHouse}
                                owner={owner}

                            />



                        </div>




                    </div>

                    <div className='title-map md-20'><FormattedMessage id="system.post-manage.showmap" /> </div>
                    {position.latFloat && position.langFloat &&
                        <div className='map-detail-house'>
                            <MapContainer
                                center={[position.latFloat, position.langFloat]}
                                zoom={13} scrollWheelZoom={false}
                                style={{ width: '100%', height: '99vh' }}

                            >

                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                />
                                <Marker position={[position.latFloat, position.langFloat]}>
                                    <Popup>
                                        {address}
                                    </Popup>
                                </Marker>

                            </MapContainer>
                        </div>

                    }

                    <div className='comment-house'>
                        <div className='title-comment'><p><FormattedMessage id="common.comment-about" /> </p></div>
                        <div className='form-group'> <form>
                            <div className='row'>
                                <div className='col-8'>
                                    <input
                                        type='text'
                                        className='form-control comment-input '
                                        placeholder='Please comment about your thinking'
                                        onChange={(event) => this.handleComment(event)}
                                    ></input>
                                </div>
                                <button

                                    className='btn  btn-post-comment'
                                    onClick={() => this.handleCommentPost()}
                                ><FormattedMessage id="common.post-comment" /></button>
                            </div>
                        </form>
                        </div>
                        <div className='all-comments'>
                            <div className='title-comment'><FormattedMessage id="common.allcomment" /></div>

                            {allcomments && allcomments.length > 0 &&
                                allcomments.map((item, index) => {
                                    let image = '';
                                    let avatar = ''
                                    if (item.image) {
                                        image = item.image;
                                        avatar = Buffer.from(image, 'base64').toString('binary');
                                    }

                                    return (

                                        <div
                                            key={index}
                                        >
                                            <div className='name-commenter row'>
                                                <div className='avatar-comment col-2'
                                                    style={
                                                        { backgroundImage: avatar ? `url(${avatar})` : `url("https://thumbs.dreamstime.com/z/no-image-available-set-pictures-means-photo-blank-picture-camera-photography-icon-silhouette-man-missing-61062496.jpg")` }}

                                                ></div>
                                                <div className='user-comment col-3'> {item.User.lastName + " " + item.User.firstName}</div>: <div className='content-comment col-6' >{item.content}</div>
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
        userInfo: state.user.userInfo,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHouse);
