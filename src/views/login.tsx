import { redirect } from "react-router-dom"
import './login.css'
import { FormControl, FormHelperText, InputLabel, Input, Button } from "@mui/material"
import { FormEvent, useState } from "react"
import AccountCircleIconOutlined from '@mui/icons-material/AccountCircleOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { LoginUser } from "../models/userLogin";
import { LoginService } from "../service/loginService";

export const LoginLoader = async () => {
    const loggedIn = sessionStorage.getItem('token')!==null
    if (loggedIn){
      return redirect('/tickets')
    }
    return null
}

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user:LoginUser = {
        email: email,
        password: password
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const success = await LoginService(user)
        if (success)
            location.reload()
    }
    return(
        <>
            <div className="container">
                <h2>DataSupport</h2>
                <form action="/tickets" onSubmit={onSubmit}>
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
                <Button type="submit" variant="outlined" color="primary" >Login</Button>
                </form>
            </div>
        </>
    )
}