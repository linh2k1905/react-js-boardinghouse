import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    houseList: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_ALL_POST_SUCCESS:

            state.houseList = action.data
            return {
                ...state

            }
        case actionTypes.FETCH_ALL_POST_FAILED:
            state.houseList = []
            return {
                ...state

            }
        default:
            return state;
    }
}

export default userReducer;