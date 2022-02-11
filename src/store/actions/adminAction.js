import actionTypes from './actionTypes';
import { getRoleService, createNewUserService, getAllUser, deleteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getRoleService();

            if (res && res.errorCode == 0) {

                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed())
            }

        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error)

        }
    }
}
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,

})
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data

})
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            if (res && res.errorCode === 0) {

                dispatch(fetchAllUserSuccess(res.users));
            }
            else {
                dispatch(fetchAllUserFailed());
            }

        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log(error);

        }
    }

}
export const deleteAUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errorCode === 0) {
                toast.success("Delete user successfully!!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Delete user error!!");
                dispatch(deleteUserFailed());
            }

        } catch (error) {
            dispatch(deleteUserFailed());
            toast.error("Delete user error!!");
            console.log(error);

        }
    }

}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data

})
export const fetchAllUserFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILED'
})

export const createNewUser = (data) => {


    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);

            if (res && res.errorCode === 0) {
                console.log('res create service', res);
                toast.success("Create a new user success!!!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.success("Create a new user error!!!");
                dispatch(saveUserFail());

            }

        } catch (error) {
            dispatch(saveUserFail());
        }
    }

}
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserFail = () => ({
    type: 'CREATE_USER_FAILED'
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            if (res && res.errorCode === 0) {
                toast.success("Edit success");
                dispatch(editUserSuccess());
            }
            else {
                dispatch(editUserFail());
            }
        } catch (error) {
            dispatch(editUserFail());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

