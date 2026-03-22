import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Cookies from 'js-cookie'

const UserNav = () => {
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
          <NavLink to="/user" className={({ isActive }) => isActive ? "text-[#7BA4D0] border-b-2 border-[#7BA4D0]" : ""} end>
            Dashboard </NavLink>
          <NavLink to="/user/result" className={({ isActive }) => isActive ? "text-[#7BA4D0] border-b-2 border-[#7BA4D0]" : ""} >
            View Result </NavLink>
          <button onClick={logOut}>Log Out</button>
        </nav>

        <button className='md:hidden' onClick={Open}><img src="/menu.svg" /></button>
      </div>

      {open &&
        <nav className=' w-[80vw] h-screen p-5 text-lg text-[#E7F0FA] bg-[#0D2440] flex flex-col gap-5 absolute top-0 right-0 '>
          <button onClick={close}><img src="/close.svg" /></button>
          <NavLink to="/user" className={({ isActive }) => isActive ? "text-[#7BA4D0]" : ""} end>
            Dashboard </NavLink>
          <NavLink to="/user/result" className={({ isActive }) => isActive ? "text-[#7BA4D0]" : ""} >
            View Result </NavLink>
          <button onClick={logOut}>Log Out</button>
        </nav>
      }
    </>
  )
}

export default UserNav