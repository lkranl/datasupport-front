import { Link, redirect } from "react-router-dom"
import './styles.css'
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import Input from "@mui/material/Input"
import Button from "@mui/material/Button"
import { FormEvent, useState } from "react"
import AccountCircleIconOutlined from '@mui/icons-material/AccountCircleOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import { RegisterUser } from "../models/user";
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
    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(false)
    const onSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const user:RegisterUser = {
            fullName: fullName,
            email: email,
            password: password
        }
        
        const response = await RegisterService(user)
        setSuccess(response as boolean)
        setSubmitted(true)
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
                <br /><br />
                <Button type="submit" variant="outlined" color="primary" >Register</Button>
                </form>
                <p>If you already have an account please <Link to={'/login'} >login</Link>.</p>
                {(success && submitted) && <p className="success">User created, please go to <Link to={'/login'} >login</Link> to access.</p>}
                {(!success && submitted) && <p className="error">There was an error creating the user, please check if your email has already an account.</p>}
            </div>
        </>
    )
}