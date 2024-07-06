import { API_URL } from "../models/api"
import { RegisterUser } from "../models/user"

export const RegisterService = async (data: RegisterUser):Promise<boolean|null> => {
    
    return await fetch(
        API_URL+'/auth/signup',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                'accept': '*/*'
            },
            body: JSON.stringify(data)
        }
    ).then(response => {
        if (!response.ok){
            return false
        }
        return true
    })
}