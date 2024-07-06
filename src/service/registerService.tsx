import { RegisterUser } from "../models/userRegister"

export const RegisterService = async (data: RegisterUser):Promise<boolean|null> => {
    
    const tmp = await fetch(
        'http://20.55.68.236:8080/auth/signup',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': '*/*'
            },
            body: JSON.stringify(data)
        }
    ).then(response => {
        console.log(response.json());
        
        if (!response.ok){
            return false
        }
        return true
    })

    console.log(tmp);

    return null
    
}