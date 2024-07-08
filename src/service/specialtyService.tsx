import { API_URL } from "../models/api"
import { SpecialtyCreate, SpecialtyGet } from "../models/specialty"

export const GetSpecialtyService = async ():Promise<SpecialtyGet[]> => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/especialidad/all',
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                'accept': '*/*',
                'Authorization': token
            },
        }
    ).then(res => {return res.json()})
    .then(data => {
        return data
    })
    .catch(() => {
        return []
    })
}

export const PostSpecialtyService = async (data: SpecialtyCreate) => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/especialidad/crear',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                'accept': '*/*',
                'Authorization': token
            },
            body: JSON.stringify(data)
        }
    ).then(response => {
        if (response.ok)
            return true
        else
            return false
    })
    .catch(() => {
        return false
    })
}