import { API_URL } from "../models/api"
import { LoginUser } from "../models/user"

export const LoginService = async (body: LoginUser):Promise<boolean|void> => {
    return await fetch(
        API_URL+'/auth/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                'accept': '*/*'
            },
            body: JSON.stringify(body)
        }
    ).then(res => {return res.json()})
    .then(data => {
        sessionStorage.setItem('token', data.token)
        return true
    })
    .catch(() => {
        return false
    })
}