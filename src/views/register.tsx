import { redirect } from "react-router-dom"
import './login.css'
import { FormControl, FormHelperText, InputLabel, Input, Button } from "@mui/material"
import { FormEvent, useState } from "react"
import AccountCircleIconOutlined from '@mui/icons-material/AccountCircleOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import { RegisterUser } from "../models/userRegister";
import { RegisterService } from "../service/registerService";

export const RegisterLoader = async () => {
    const loggedIn = sessionStorage.getItem('token')!==null
    if (loggedIn){
      return redirect('/tickets')
    }
    return null
}

export const Register = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(null)
    const onSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const user:RegisterUser = {
            fullname: fullName,
            email: email,
            password: password
        }
        
        const response = await RegisterService(user)
        setSuccess(response)
    }
    return(
        <>
            <div className="container">
                <h2>DataSupport</h2>
                <form action="/tickets" onSubmit={onSubmit}>
                <FormControl>
                    <InputLabel htmlFor='fullName'><BadgeOutlined sx={{fontSize: 15}} /> Full name:</InputLabel>
                    <Input id="fullName" type="text" aria-describedby="fullNmae-help" onChange={e => setFullName(e.target.value)} required />
                    <FormHelperText id="fullName-help">please enter your full name.</FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl>
                    <InputLabel htmlFor='email'><AccountCircleIconOutlined sx={{fontSize: 15}} /> Email:</InputLabel>
                    <Input id="email" type="email" aria-describedby="email-help" onChange={e => setEmail(e.target.value)} required />
                    <FormHelperText id="email-help">please enter your e-mail.</FormHelperText>
                </FormControl>
                <br /><br />
                <FormControl>
                    <InputLabel htmlFor='password'><LockPersonOutlinedIcon sx={{fontSize: 15}} /> Password:</InputLabel>
                    <Input id="password" type="password" aria-describedby="password-help" onChange={e => setPassword(e.target.value)} required />
                    <FormHelperText id="password-help">please enter your password.</FormHelperText>
                </FormControl>
                <br />
                <Button type="submit" variant="outlined" color="primary" >Register</Button>
                </form>
                {success===true && <>User created</>}
                {success===false && <>Error creating user</>}
            </div>
        </>
    )
}