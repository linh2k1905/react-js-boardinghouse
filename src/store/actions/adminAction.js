import actionTypes from './actionTypes';
import {
    getRoleService, createNewUserService,
    getAllUser, deleteUserService,
    editUserService, getAllOwnerService,
    getTypeHouseService,
    getCityService,
    createNewPostService,
    getAllPost,
    editPostService,
    getAllHomeService,
    deletePostService,
    searchUserByTypeUser



} from '../../services/userService';
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
export const fetchTypeHouseStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTypeHouseService();

            if (res && res.errorCode == 0) {

                dispatch(fetchTypeHouseSuccess(res.data));
            }
            else {
                dispatch(fetchTypeHouseFailed())
            }

        } catch (error) {
            dispatch(fetchTypeHouseFailed())
            console.log(error)

        }
    }
}
export const fetchTypeHouseFailed = () => ({
    type: actionTypes.FETCH_TYPEHOUSE_FAILED,

})
export const fetchTypeHouseSuccess = (data) => ({
    type: actionTypes.FETCH_TYPEHOUSE_SUCCESS,
    data: data

})

export const fetchCitiesStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getCityService();

            if (res && res.errorCode == 0) {

                dispatch(fetchCitySuccess(res.data));
            }
            else {
                dispatch(fetchCityFailed())
            }

        } catch (error) {
            dispatch(fetchCityFailed())
            console.log(error)

        }
    }
}
export const fetchCityFailed = () => ({
    type: actionTypes.FETCH_CITY_FAILED,

})
export const fetchCitySuccess = (data) => ({
    type: actionTypes.FETCH_CITY_SUCCESS,
    data: data

})
export const fetchAllUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser(id);

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
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data

})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
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
export const createNewPost = (data) => {


    return async (dispatch, getState) => {
        try {
            let res = await createNewPostService(data);

            if (res && res.errorCode === 0) {
                console.log('res create service', res);
                toast.success("Create a new post success!!!");
                dispatch(savePostSuccess());

            }
            else {
                toast.success("Create a new user error!!!");
                dispatch(savePostFail());

            }

        } catch (error) {
            dispatch(savePostFail());
        }
    }

}
export const savePostSuccess = () => ({
    type: actionTypes.CREATE_POST_SUCCESS
})
export const savePostFail = () => ({
    type: actionTypes.CREATE_POST_FAILED
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
export const fetchOwner = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllOwnerService();

            if (res && res.errorCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_OWNERS_SUCCESS,
                    dataOwner: res.data
                });

            }
            else {

                dispatch({
                    type: actionTypes.FETCH_OWNERS_FAILED
                });

            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_OWNERS_FAILED
            });
        }
    }

}
export const fetchUserByTypeUser = (id) => {

    return async (dispatch, getState) => {
        try {

            let res = await searchUserByTypeUser(id);

            if (res && res.errorCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_USER_SUCCESS,
                    dataUser: res.users
                });

            }
            else {

                dispatch({
                    type: actionTypes.FETCH_USERS_FAILED
                });

            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_USERS_FAILED
            });
        }
    }

}
export const fetchAllPost = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllPost();
            console.log('check res', res);

            if (res && res.errorCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALL_POST_SUCCESS,
                    dataPosts: res.data
                });

            }
            else {

                dispatch({
                    type: actionTypes.FETCH_ALL_POST_FAILED
                });

            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_POST_FAILED
            });
        }
    }

}


export const fetchEditPost = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('fecth edit post', data);

            let res = await editPostService(data);
            if (res && res.errorCode === 0) {
                toast.success("Edit success");
                dispatch(editPostSuccess());
            }
            else {
                dispatch(editPostFail());
            }
        } catch (error) {
            dispatch(editPostFail());
        }
    }
}

export const editPostSuccess = () => ({
    type: actionTypes.EDIT_POST_SUCCESS
})
export const editPostFail = () => ({
    type: actionTypes.EDIT_POST_FAILED
})
export const fetchAllHome = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllHomeService();

            if (res && res.errorCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALL_HOME_SUCCESS,
                    dataHouses: res.data
                });

            }
            else {

                dispatch({
                    type: actionTypes.FETCH_ALL_HOME_FAILED
                });

            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_POST_FAILED
            });
        }
    }

}

export const deleteAPost = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deletePostService(id);
            if (res && res.errorCode === 0) {
                toast.success("Delete post successfully!!");
                dispatch(deletePostSuccess());
                dispatch(fetchAllHome());
            }
            else {
                toast.error("Delete user error!!");
                dispatch(deletePostFailed());
            }

        } catch (error) {
            dispatch(deletePostFailed());
            toast.error("Delete post error!!");
            console.log(error);

        }
    }

}
export const deletePostSuccess = () => ({
    type: actionTypes.DELETE_POST_SUCCESS
})
export const deletePostFailed = () => ({
    type: actionTypes.DELETE_POST_FAILED
})