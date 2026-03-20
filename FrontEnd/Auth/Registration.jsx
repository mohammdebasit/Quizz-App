import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

const Registration = () => {
    const [message, setmessage] = useState('')
    async function send(data) {
        const res = await axios.post('http://localhost:3000/auth/register', data)
        console.log(data);
        
        setmessage(res.data.message)
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => send(data);
    return (
        <section className='flex justify-center items-center min-h-screen bg-[#F0F4FA] px-4'>

            <section className='relative flex flex-col justify-center w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 gap-6'>

                <section className='flex flex-col gap-1 text-center pt-2'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-[#2E3A59] tracking-tight'>Registration</h1>
                    <p className="text-sm text-[#9CA3AF]">Create your account</p>
                </section>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    <div className='text-red-500 text-sm text-center min-h-5'><p>{message}</p></div>

                    <section className="flex flex-col gap-1.5">
                        <label htmlFor="name" className='text-sm font-medium text-[#6B7280]'>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: true })}
                            className='border border-[#D1D5DB] p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-transparent transition'
                        />
                    </section>

                    <section className="flex flex-col gap-1.5">
                        <label htmlFor="email" className='text-sm font-medium text-[#6B7280]'>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", { required: true })}
                            className='border border-[#D1D5DB] p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-transparent transition'
                        />
                    </section>

                    <section className="flex flex-col gap-1.5">
                        <label htmlFor="password" className='text-sm font-medium text-[#6B7280]'>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", { required: true })}
                            className='border border-[#D1D5DB] p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E99] focus:border-transparent transition'
                        />
                    </section>

                    <input
                        type="submit"
                        value="Register"
                        className='mt-1 p-3 rounded-lg text-white font-semibold bg-[#2E5E99] hover:bg-[#2E3A59] active:scale-[0.98] cursor-pointer transition-all duration-200'
                    />
                </form>

                <p className="text-center text-sm text-[#9CA3AF]">
                    Already Have An Account?{' '}
                    <NavLink to="/login" className='text-[#2E5E99] font-medium hover:text-[#2E3A59] hover:underline transition' end>
                        Login
                    </NavLink>
                </p>

            </section>
        </section>
    )
}

export default Registration