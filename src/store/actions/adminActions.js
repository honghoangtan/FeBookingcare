import actionTypes from './actionTypes';

import { getAllCodeService, createNewUser, getAllUser, deleteUser, updateUser, getTopDoctorHomeService, getAllDoctor, saveDetailDoctor,
        getSpecialty, getClinic
} from '../../services/userService'
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispath, getState) => {
        try {

            dispath({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService('gender')

            if (res && res.EC === 0) {
                dispath(fetchGenderSuccess(res.DT))
            } else {
                dispath(fetchGenderFail())
            }

        } catch(e) {
            dispath(fetchGenderFail())
            console.log(e)
        } 
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})


export const fetchPositionStart = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllCodeService('position')

            if (res && res.EC === 0) {
                dispath(fetchPositionSuccess(res.DT))
            } else {
                dispath(fetchPositionFail())
            }

        } catch(e) {
            dispath(fetchPositionFail())
            console.log(e)
        } 
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllCodeService('role')

            if (res && res.EC === 0) {
                dispath(fetchRoleSuccess(res.DT))
            } else {
                dispath(fetchRoleFail())
            }

        } catch(e) {
            dispath(fetchRoleFail())
            console.log(e)
        } 
    }
}

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser2 = (data) => {
    return async (dispath, getState) => {
        try {

            let res = await createNewUser(data)

            console.log('>>> CHECK RES USER REDUX: ', res)

            if (res && res.EC === 0) {
                dispath(saveUserSuccess())
                dispath(fetchUsersStart())
                toast.success('Create a new user success')
            } else {
                dispath(saveUserFail())
            }

        } catch (e) {
            dispath(saveUserFail())
            console.log(e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL

})


export const fetchUsersStart = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllUser('ALL')

            if (res && res.EC === 0) {
                let usersArr = res.DT
                dispath(fetchUsersSuccess(usersArr))
            } else {
                dispath(fetchUsersFail())
            }

        } catch(e) {
            dispath(fetchUsersFail())
            console.log(e)
        } 
    }
}

export const fetchUsersSuccess = (users) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    data: users
})

export const fetchUsersFail = () => ({
    type: actionTypes.FETCH_USERS_FAIL

})

export const updateUser2 = (data) => {
    return async (dispath, getState) => {
        try {

            let res = await updateUser(data)

            if (res && res.EC === 0) {
                dispath(updateUserSuccess())
                dispath(fetchUsersStart())
                toast.success('Update user success')
            } else {
                toast.error('Update user error')

                dispath(updateUserFail())
            }

        } catch (e) {
            dispath(updateUserFail())
            console.log(e)
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL

})

export const deleteUser2 = (data) => {
    return async (dispath, getState) => {
        try {

            let res = await deleteUser(data)

            if (res && res.EC === 0) {
                dispath(deleteUserSuccess())
                dispath(fetchUsersStart())
                toast.success('Delete user success')
            } else {
                toast.error('Delete user error')

                dispath(deleteUserFail())
            }

        } catch (e) {
            dispath(deleteUserFail())
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL

})

export const fetchTopDoctor = () => {
    return async (dispath, getState) => {
        try {

            let res = await getTopDoctorHomeService(3)
            console.log('>>> CHECK RES DOCTOR FROM REDUX: ', res)

            if (res && res.EC === 0) {
                dispath({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.DT
                })
            } else {
                dispath({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL
                })
            }

        } catch (e) {
            console.log(e)
            dispath({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispath, getState) => {
        try {

            let res = await getAllDoctor()

            if (res && res.EC === 0) {

                console.log(">>> CHECK RES FETCH ALL DOCTOR: ", res.DT)
                dispath({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.DT
                })
            } else {
                dispath({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
                })
            }

        } catch (e) {
            console.log(e)
            dispath({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL
            })
        }
    }
}

export const saveDetailDoctor2 = (dataInput) => {
    return async (dispath, getState) => {
        try {

            let res = await saveDetailDoctor(dataInput)

            if (res && res.EC === 0) {
                toast.success(res.EM)
                dispath({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error(res.EM)
                dispath({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
                })
            }

        } catch (e) {
            console.log(e)            
            dispath({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispath, getState) => {
        try {

            let res = await getAllCodeService("TIME")

            if (res && res.EC === 0) {
                dispath({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    data: res.DT
                })
            } else {
                dispath({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
                })
            }

        } catch (e) {
            console.log(e)
            dispath({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispath, getState) => {
        try {

            dispath({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')

            let resSpecialty = await getSpecialty(5)
            let resClinic = await getClinic()

            if (resPrice && resPrice.EC === 0 &&
                resPayment && resPayment.EC === 0 &&
                resProvince && resProvince.EC === 0 &&
                resSpecialty && resSpecialty.EC === 0 &&
                resClinic && resClinic.EC === 0
                ) {
                    let data = {
                        resPrice: resPrice.DT,
                        resPayment: resPayment.DT,
                        resProvince: resProvince.DT,
                        resSpecialty: resSpecialty.DT,
                        resClinic: resClinic.DT
                    }
                dispath(getRequiredDoctorInforSuccess(data))
            } else {
                dispath(getRequiredDoctorInforFail())
            }

        } catch(e) {
            dispath(getRequiredDoctorInforFail())
            console.log(e)
        } 
    }
}

export const getRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const getRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL

})


