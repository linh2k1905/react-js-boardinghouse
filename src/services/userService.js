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
    getAllPost
}
