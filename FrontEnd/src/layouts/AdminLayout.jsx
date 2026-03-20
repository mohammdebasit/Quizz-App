import React from 'react'
import AdminNav from '../Admin/components/AdminNav'
import { Navigate, Outlet } from 'react-router'
import Cookies from 'js-cookie'
const AdminLayout = () => {
    const role = Cookies.get("role")
    const token = Cookies.get("token")
    return (
        <>
            {
                role == "admin" && token ? <> <AdminNav /><Outlet /> </> : <Navigate to={"/login"} replace />
            }
        </>
    )
}

export default AdminLayout