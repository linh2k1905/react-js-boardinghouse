import axios from '../axios';
const handelLoginAPI = (email, password) => {
    return axios.post('/api/login', {
        email: email
        , password: password
    });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/get-all-users-by-type-user?roleId=${idUser}`);
}
const getAllUserById = (idUser) => {
    return axios.get(`/api/get-user-by-id?id=${idUser}`);
}
const getAllPost = () => {
    return axios.get('/api/get-all-house');
}
const createNewUserService = (data) => {

    return axios.post('/api/create-new-user', data);
}
const createNewPostService = (data) => {

    return axios.post('/api/create-new-post', data);

}
const deleteUserService = (idUser) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: idUser
        }
    });
}
const editUserService = (data) => {

    return axios.put('/api/edit-user', data);
}
const getRoleService = () => {

    return axios.get('/api/getRole');
}
const getAllOwnerService = () => {

    return axios.get('/api/top-owner-home');
}
const getTypeHouseService = () => {

    return axios.get('/api/getTypeHouse');
}
const getCityService = () => {

    return axios.get('/api/getCity');
}
const getHouseServiceById = (id) => {

    return axios.get(`/api/detail-house-by-id?id=${id}`);
}
const editPostService = (data) => {

    return axios.put('/api/edit-house-by-id', data
    );
}
const getAllHomeService = () => {
    return axios.get('/api/get-all-home');
}
const deletePostService = (dataId) => {
    return axios.delete('/api/delete-house-by-id', {
        data: {
            id: dataId
        }
    });
}

const bulkCreateSchedulService = (data) => {

    return axios.post('/api/create-bulk-schedule', data);
}
const getScheduleOwnerFromDate = (id, date) => {

    return axios.get(`/api/get-schedule-owner?id=${id}&date=${date}`);
}

const searchHouseByUserService = (data) => {

    return axios.get(`/api/get-filter-house-from-home?idTypeHouse=${data.idTypeHouse}&idCity=${data.idCity}&price=${data.price}&area=${data.area}`);
}
const searchHouseByCityService = (data) => {

    return axios.get(`/api/get-all-home-by-city?idCity=${data.idCity}`);
}
const searchHouseByTypeHouse = (data) => {

    return axios.get(`/api/get-all-type-house-by-id?id=${data}`);
}
const searchUserByTypeUser = (roleId) => {

    return axios.get(`/api/get-all-users-by-type-user?roleId=${roleId}`);
}
const handleGetInfoBooking = (idHouse, idOwner) => {

    return axios.get(`/api/get-info-booking?idHouse=${idHouse}&idOwner=${idOwner}`);
}
const handlePostBooking = (data) => {

    return axios.post('/api/user-booking', data);
}
const handlePostBookingWithoutPassword = (data) => {

    return axios.post('/api/user-booking-none-password', data);
}

const handlePostComment = (data) => {

    return axios.post('/api/create-new-comment', data);
}
const handelGetAllCommentByHouseId = (data) => {

    return axios.get(`/api/get-all-comment-by-houseId?idHouse=${data}`);
}
const handelGetAllBooking = (data) => {

    return axios.get(`/api/admin-booking?id=${data}`);
}
const handelDeleteBooking = (id) => {
    return axios.delete(`/api/delete-booking-by-id?id=${id}`
    );
}
const editBooKingService = (data) => {

    return axios.put('/api/edit-booking-by-id', data);
}

const handleVerifyBooking = (data) => {

    return axios.post('/api/verify-book-appoinment', data);
}
const handleVerifyBookingFromOwner = (data) => {

    return axios.post('/api/verify-book-appoinment-from-owner', data);
}
const handleVerifyBookingCancle = (data) => {

    return axios.post('/api/verify-cancel-book-appoinment', data);
}

const getFilterHouseService = (data) => {

    return axios.get(`/api/get-filter-house?idUser=${data.idUser}&idCity=${data.idCity}`);
}
const getAllComment = () => {
    return axios.get('/api/get-all-comment');
}
const deleteCommentById = (id) => {
    return axios.delete('/api/delete-comment', {
        data: {
            id: id
        }
    });
}
const editCommentService = (data) => {

    return axios.put('/api/edit-comment-by-id', data);
}
const getHouseByEmailUser = (email) => {
    console.log(email);

    return axios.get(`/api/get-house-by-mail-user?email=${email}`)
}
const getBookingByUserId = (id) => {

    return axios.get(`/api/get-all-booking-by-user-id?id=${id}`)
}
const getBlockUserAndPost = (data) => {

    return axios.put('/api/get-block-user-has-post-unvailable', data);
}

export {
    handelLoginAPI,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getRoleService,
    getAllOwnerService,
    getTypeHouseService,
    getCityService,
    createNewPostService,
    getAllPost,
    getHouseServiceById,
    editPostService,
    getAllHomeService,
    deletePostService,
    bulkCreateSchedulService,
    getScheduleOwnerFromDate,
    searchHouseByUserService,
    searchHouseByTypeHouse,
    searchUserByTypeUser,
    handleGetInfoBooking,
    handlePostBooking,
    handlePostComment,
    handelGetAllCommentByHouseId,
    handelGetAllBooking,
    handelDeleteBooking,
    editBooKingService,
    getAllUserById,
    handleVerifyBooking,
    getFilterHouseService,
    getAllComment,
    deleteCommentById,
    editCommentService,
    getHouseByEmailUser,
    handleVerifyBookingCancle,
    handleVerifyBookingFromOwner,
    getBookingByUserId,
    searchHouseByCityService,
    handlePostBookingWithoutPassword,
    getBlockUserAndPost
}
