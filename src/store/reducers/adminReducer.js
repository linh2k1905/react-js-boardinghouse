import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    users: [],
    owner: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {

                ...state

            }
        case actionTypes.FETCH_OWNERS_SUCCESS:
            state.owner = action.dataOwner;


            return {

                ...state

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.owner = [];

            return {

                ...state

            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;

            return {

                ...state

            }


        default:
            return state;
    }
}

export default adminReducer;