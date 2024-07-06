import { LoginUser } from "../models/userLogin"

export const LoginService = async (body: LoginUser):Promise<boolean|void> => {
    console.log(body);
    
    return await fetch(
        'http://20.55.68.236:8080/auth/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
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