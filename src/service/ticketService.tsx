import { API_URL } from "../models/api"
import { TicketCreate, TicketGet } from "../models/ticket"

export const GetTicketService = async ():Promise<TicketGet[]> => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/ticket/all',
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

export const PostTicketService = async (data: TicketCreate) => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/ticket/crear',
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