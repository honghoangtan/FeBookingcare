
import axios from "../axios";

const loginUser = (email, password) => {
    return axios.post('/api/login', {
        email,
        password,
    });
};

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const deleteUser = (user) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: user.id
        }
    })
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const updateUser = (userData) => {
    return axios.put('/api/update-user', { ...userData });
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)

}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`)

}

const saveDetailDoctor = (inputData) => {
    return axios.post(`/api/save-infor-doctor`, inputData)

}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)

}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)

}

const getExtraInforDocorById = (doctorId) => {
    return axios.get(`/api/get-exrea-infor-doctor-by-id?doctorId=${doctorId}`)

}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)

}

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getSpecialty = (limit) => {
    return axios.get(`/api/get-specialty?limit=${limit}`)
}

const getDoctorBySpecialtyId = (data) => {
    return axios.get(`/api/get-doctor-in-specialty?specialtyId=${data.specialtyId}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?clinicId=${data.clinicId}`)
}

const getPatientByDoctorId = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remery`, data)
}

export {
    loginUser,
    getAllUser,
    deleteUser,
    createNewUser,
    updateUser,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctor,
    saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDocorById,
    getProfileDoctorById,
    postPatientBookingAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getSpecialty,
    getDoctorBySpecialtyId,
    createNewClinic,
    getClinic,
    getDetailClinicById,
    getPatientByDoctorId,
    postSendRemedy
};