import { LoginUser } from "../models/userLogin"

export const LoginService = async (body: LoginUser) => {
    const response = await fetch(
        'http://20.55.68.236:8080/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(body)
        }
    ).then(res => {return res.json()})
    .then(data => sessionStorage.setItem('token', data.token))
    .catch(error => console.error(error))

    return response
}