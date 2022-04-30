import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,

});
instance.defaults.timeout = 10000;




instance.interceptors.response.use(
    (response) => {

        const { data } = response;
        console.log(data);

        return data;

    }
);

export default instance;
