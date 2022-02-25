import actionTypes from './actionTypes';
import {

    getAllPost

} from '../../services/userService';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const fetchAllPostStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPost();

            if (res && res.errorCode === 0) {


                dispatch(fetchAllPostSuccess(res.data));
            }
            else {
                dispatch(fetchAllPostFailed());
            }

        } catch (error) {
            dispatch(fetchAllPostFailed());
            console.log(error);

        }
    }

}
export const fetchAllPostFailed = () => ({
    type: actionTypes.FETCH_ALL_POST_FAILED,

})
export const fetchAllPostSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_POST_SUCCESS,
    data: data

})