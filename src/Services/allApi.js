import commonApi from "./commonApi"
import SERVER_URL from "./server_url"

// loginAPI
export const loginAPI = async (reqBody)=>{
    return await commonApi('POST',`${SERVER_URL}/admin/login`,reqBody)
}

// get grievanceAPI
export const getAllGrievanceAPI = async(reqHeader)=>{
    return await commonApi('GET',`${SERVER_URL}/getAllGrievance`,{},reqHeader)
}

// updateGrievanceStatusAPI
export const updateGrievanceStatusAPI = async(gId,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${SERVER_URL}/admin/grievanceStatus/${gId}/update`,reqBody,reqHeader)
}