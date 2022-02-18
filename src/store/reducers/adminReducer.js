import actionTypes from '../actions/actionTypes';

const initialState = {
    roles: [],
    users: [],
    owner: [],
    typeHouses: [],
    cities: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {


        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
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
        case actionTypes.FETCH_TYPEHOUSE_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_TYPEHOUSE_SUCCESS:
            state.typeHouses = action.data;


            return {

                ...state

            }
        case actionTypes.FETCH_TYPEHOUSE_FAILED:
            return {

                ...state

            }
        case actionTypes.FETCH_CITY_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_CITY_SUCCESS:
            state.cities = action.data;


            return {

                ...state

            }
        case actionTypes.FETCH_CITY_FAILED:
            state.cities = [];
            return {

                ...state

            }


        default:
            return state;
    }
}

export default adminReducer;