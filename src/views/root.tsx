import { Outlet, redirect } from "react-router-dom";

export const RootLoader = async () => {
    let loggedOut = sessionStorage.getItem('token')===null
    if (loggedOut){
      return redirect('/login')
    }
    return null
}

export const Root = () => {
    const logout  = () => {
        sessionStorage.removeItem('token')
        location.reload()
    }
    return(
        <>
            <p>Hello world! navbar: <a href='' onClick={logout} >logout</a> </p>
            <Outlet />
        </>
    )
}