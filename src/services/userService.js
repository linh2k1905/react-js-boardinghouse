import axios from '../axios';
const handelLoginAPI = (email, password) => {
    return axios.post('/api/login', {
        email: email
        , password: password
    });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`);
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

    return axios.get(`api/get-schedule-owner?id=${id}&date=${date}`);
}

const searchHouseByUserService = (data) => {

    return axios.get(`/api/get-filter-house-from-home?idTypeHouse=${data.idTypeHouse}&idCity=${data.idCity}&price=${data.price}&area=${data.area}`);
}
const searchHouseByTypeHouse = (data) => {

    return axios.get(`api/get-all-type-house-by-id?id=${data}`);
}
const searchUserByTypeUser = (roleId) => {

    return axios.get(`api/get-all-users-by-type-user?roleId=${roleId}`);
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
    searchUserByTypeUser
}
