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
const createNewUserService = (data) => {
    console.log(data);
    return axios.post('/api/create-new-user', data);
}
const deleteUserService = (idUser) => {
    console.log(idUser);
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
export {
    handelLoginAPI,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getRoleService,
    getAllOwnerService
}
