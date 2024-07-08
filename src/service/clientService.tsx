import { API_URL } from "../models/api"
import { ClientTicket } from "../models/client"

export const GetClientService = async ():Promise<ClientTicket[]> => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/cliente/all',
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