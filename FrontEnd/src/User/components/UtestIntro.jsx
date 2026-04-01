import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const UtestIntro = ({ id, title, time, description }) => {
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [isAttempt, setAttempt] = useState(true)
    const navigate = useNavigate();

    const [formattedTime, setTime] = useState(`00 minutes 00 seconds`)
    useEffect(() => {
        async function fetchTime() {

            const res = (await axios.get(`http://localhost:3000/mcqs/${id}`)).data
            const minutes = Math.floor((res.length * time) / 60)
            const seconds = (res.length * time) % 60

            setTime(`${minutes.toString().padStart(2, '0')} minutes ${seconds.toString().padStart(2, '0')} seconds`)

            setTotalSeconds(res.length * time)
        }

        async function attempt() {
            const res = await axios.get(`http://localhost:3000/result/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
            setAttempt(res.data.attempted)
        }
        fetchTime()
        attempt()
    }, [])

    return (
        <>
            <div className="w-[95%] mx-auto  rounded-md shadow-lg/15 p-6 mb-6 md:rounded-none lg:w-[60%] lg:mx-auto ">

                <h3 className="text-lg font-semibold mb-3">
                    {title}
                </h3>

                <hr className='hidden md:flex border border-gray-200 ' />

                <p className="text-sm text-gray-600 mb-1 md:text-base md:my-6">
                    <span className="font-medium">Time:</span> {formattedTime}
                </p>

                <p className="text-sm text-gray-500 mb-4 md:text-base md:my-6">
                    <span className="font-medium">Description:</span> {description}
                </p>

                <div className="flex gap-3 justify-end">

                    {

                        !isAttempt ? <button onClick={() => { navigate(`/testpage/${id}`, { state: { totalSeconds } }) }}
                            className="flex-1 py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none md:w-48" >
                            Start Test
                        </button> : <button
                            className="flex-1 py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none md:w-48" >
                            Already Attempeted
                        </button>
                    }
                </div>

            </div>

        </>
    )
}

export default UtestIntro