import { API_URL } from "../models/api"
import { TicketGet } from "../models/ticket"

export const GetTicketService = async ():Promise<TicketGet[]> => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/contrato/all',
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                'accept': '*/*',
                'Authorization': token
            },
        }
    ).then(res => {console.log(res);return res.json()})
    .then(data => {
        return data
    })
    .catch(() => {
        return []
    })
}