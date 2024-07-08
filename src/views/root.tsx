import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { Link, Outlet, redirect } from "react-router-dom";

export const RootLoader = async () => {
    const loggedOut = sessionStorage.getItem('token')===null
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
            <nav className="nav-bar">
                <h3 className="nav-title">DataSupport</h3>
                <Link className="nav-item" to={''} onClick={logout} ><LogoutOutlined />Logout</Link>
            </nav>
            <Outlet />
        </>
    )
}