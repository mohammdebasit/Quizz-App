import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import BASE_URL from '../../config';

const UtestIntro = ({ id, title, time, description }) => {
    const [totalSeconds, setTotalSeconds] = useState(0)
        const [totaques , setques]=useState(0)
    const [isAttempt, setAttempt] = useState(true)
    const navigate = useNavigate();

    const [formattedTime, setTime] = useState(`00 min 00 sec`)
    useEffect(() => {
        async function fetchTime() {

            const res = (await axios.get(`${BASE_URL}/mcqs/${id}`)).data
            const minutes = Math.floor((res.length * time) / 60)
            const seconds = (res.length * time) % 60

            setTime(`${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`)
            setques(res.length )
            setTotalSeconds(res.length * time)
        }

        async function attempt() {
            const res = await axios.get(`${BASE_URL}/result/${id}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
            setAttempt(res.data.attempted)
        }
        fetchTime()
        attempt()
    }, [])

    return (
        <>
            <div className="m-2 p-2 flex flex-col gap-2 border border-[#7BA4D0] rounded-xl font-sans shadow-lg lg:p-6 lg:gap-3 lg:m-auto lg:my-4 lg:w-[60vw] ">

                <p className="font-medium text-xl text-[#0D2440] underline underline-offset-5 mb-3">
                    {title}
                </p>

                <div className="flex gap-1"><img src="clock.svg" className='brightness-0 ' /><p className="">{formattedTime}</p></div>
                <div className="flex gap-1"><img src="ques.svg" className='brightness-0 ' /><p className="">{totaques} questions</p></div>

                <p className="text-justify"><b className='text-[#0D2440]'>Decription : </b>{description}</p>


                <div className="flex gap-3 justify-end">

                    {!isAttempt ? <button onClick={() => { navigate(`/testpage/${id}`, { state: { totalSeconds } }) }}
                        className="group border rounded-lg w-30 mt-2 p-2.5 px-6 flex justify-center sm:w-40 sm:gap-3 bg-[#2E5E99] text-white hover:bg-white hover:text-[#0D2440] transition duration-300 " >
                        Start <img src="arrow.svg" className='group-hover:brightness-0' />
                    </button> : <button
                        className="group border rounded-lg w-30 mt-2 p-2.5 px-6 flex justify-center sm:w-40 sm:gap-3 bg-[#2E5E99] text-white hover:bg-white hover:text-[#0D2440] transition duration-300 " >
                        Attempeted <img src="attempted.svg" className='group-hover:brightness-0' />
                    </button>
                    }
                </div>

            </div>

        </>
    )
}

export default UtestIntro