import React from 'react'
import UserNav from '../User/components/UserNav'
import { Navigate, Outlet } from 'react-router'
import Cookies from 'js-cookie'

const UserLayout = () => {
    const role = Cookies.get("role")
    const token = Cookies.get("token")
    return (
        <>
            {
                token && role == "student" ? <> <UserNav /><Outlet /> </> : <Navigate to={"/login"} />
            }
        </>
    )
}

export default UserLayout