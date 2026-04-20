import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BASE_URL from '../../config';

const TestIntro = ({ id, title, time, description }) => {
    const navigate = useNavigate();

    const [formattedTime, setTime] = useState(`00 min 00 sec`)
    const [totaques , setques]=useState(0)
    useEffect(() => {
        async function fetchTime() {

            const res = (await axios.get(`${BASE_URL}/mcqs/${id}`)).data
            const minutes = Math.floor((res.length * time) / 60)
            const seconds = (res.length * time) % 60

            setques(res.length)
            setTime(`${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`)
        }
        fetchTime()
    }, [])

    return (
        <>
            <div className="m-2 p-2 flex flex-col gap-2 border border-[#7BA4D0] rounded-xl font-sans shadow-lg lg:p-6 lg:gap-3 lg:m-auto lg:my-4 lg:w-[60vw] ">

                <p className="font-medium text-xl text-[#0D2440] underline underline-offset-5 mb-3">
                    {title}
                </p>

                <div className="flex gap-1 items-center"><img src="clock.svg" className='brightness-0 ' /><p className="">{formattedTime}</p></div>
                <div className="flex gap-1 items-center"><img src="ques.svg" className='brightness-0 ' /><p className="">{totaques} questions</p></div>

                <p className="text-justify"><b className='text-[#0D2440]'>Decription : </b>{description}</p>


                <div className="flex gap-3 justify-end">
                    <button onClick={() => { navigate(`/addmcq/${id}`) }}
                        className="border rounded-lg w-30 mt-2 p-2.5 px-6 self-end flex justify-center sm:w-40 sm:gap-3 bg-[#2E5E99] text-white hover:bg-white hover:text-[#0D2440] transition duration-300 " >
                        Add Question
                    </button>

                    <button onClick={() => { navigate(`/test/${id}`) }}
                        className="border rounded-lg w-30 mt-2 p-2.5 px-6 self-end flex justify-center sm:w-40 sm:gap-3 bg-[#2E5E99] text-white hover:bg-white hover:text-[#0D2440] transition duration-300 " >
                        View Test
                    </button>
                </div>

            </div>
        </>
    )
}

export default TestIntro