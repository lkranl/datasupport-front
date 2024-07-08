import { API_URL } from "../models/api"
import { ContractCreate, ContractGet } from "../models/contract"

export const GetContractService = async ():Promise<ContractGet[]> => {
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
    ).then(res => {return res.json()})
    .then(data => {
        return data
    })
    .catch(() => {
        return []
    })
}

export const PostContractService = async (data: ContractCreate) => {
    const token = 'Bearer '+sessionStorage.getItem('token')
    return await fetch(
        API_URL+'/contrato/crear',
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