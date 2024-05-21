import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    isLoadingGender: false,
    topDoctors: [],
    allDoctors: [],

    allScheduleTime: [],

    allRequiredDoctorInfor: []
}

const adminReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            let copyState = {...state}
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS: 
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = []
            return {
                ...state,
            }
                
        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = []
            return {
                ...state,
            } 
            
        case actionTypes.FETCH_USERS_SUCCESS: 
            state.users = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_USERS_FAIL:
            state.users = []
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: 
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: 
            state.allDoctors = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.topDoctors = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 
            state.allScheduleTime = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            state.allScheduleTime = []
            return {
                ...state,
            }        

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: 
            state.allRequiredDoctorInfor = action.data

            console.log(">>> CHECK ALL REQUIRED DOCTOR INFOR: ", action.data)
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            state.allRequiredDoctorInfor = []
            return {
                ...state,
            }   

        default:
            return state;
    }
}

export default adminReducer2;