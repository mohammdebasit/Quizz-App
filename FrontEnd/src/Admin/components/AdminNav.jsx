import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Cookies from 'js-cookie'
const AdminNav = () => {
    const [open, setOpen] = useState(false)

    const close = () => { setOpen(false) }
    const Open = () => { setOpen(true) }

    const navigate = useNavigate()
    function logOut() {
        Cookies.remove("token")
        Cookies.remove("role")
        navigate("/login")
    }
    return (
        <>
            <div className='p-5 flex justify-between text-lg text-white bg-[#0D2440] mb-5'>
                <p className='font-semibold'>Quizz App</p>

                <nav className='hidden md:flex gap-8'>
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-[#7BA4D0] border-b-2 border-[#7BA4D0]" : ""} >
                        Dashboard </NavLink>
                    <NavLink to="/createtest" className={({ isActive }) => isActive ? "text-[#7BA4D0] border-b-2 border-[#7BA4D0]" : ""} >
                        Create Test </NavLink>
                    <NavLink to="/Result" className={({ isActive }) => isActive ? "text-[#7BA4D0] border-b-2 border-[#7BA4D0]" : ""} >
                        View Result </NavLink>
                    <button onClick={logOut}>Log out</button>
                </nav>

                <button className='md:hidden' onClick={Open}><img src="menu.svg" /></button>
            </div>

            {open &&
                <nav className=' w-[80vw] h-screen p-5 text-lg text-[#E7F0FA] bg-[#0D2440] flex flex-col gap-5 absolute top-0 right-0 '>
                    <button onClick={close}><img src="close.svg" /></button>
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-[#7BA4D0]" : ""} >
                        Dashboard </NavLink>
                    <NavLink to="/createtest" className={({ isActive }) => isActive ? "text-[#7BA4D0]" : ""} >
                        Create Test </NavLink>
                    <NavLink to="/Result" className={({ isActive }) => isActive ? "text-[#7BA4D0]" : ""} >
                        View Result </NavLink>
                    <button onClick={logOut}>Log out</button>
                </nav>
            }
        </>
    )
}

export default AdminNav