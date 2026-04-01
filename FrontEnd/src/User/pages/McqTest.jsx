import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'

const McqTest = () => {
    const { testId } = useParams()
    const navigate = useNavigate()

    //getting props from the parent componenet
    const { state } = useLocation()
    //building a timmer
    const [seconds, setSeconds] = useState(state.totalSeconds)

    useEffect(() => {
        let endTime = Number(localStorage.getItem("endTime"))

        if (!endTime) {
            endTime = Date.now() + seconds * 1000
            localStorage.setItem("endTime", endTime)
        }

        const Remaining = Math.floor((endTime - Date.now()) / 1000)
        if (Remaining >= 0) {
            setSeconds(Remaining)
        } else {
            setSeconds(0)
        }

    }, [])

    useEffect(() => {
        if (seconds == 0) return handleSubmit()

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 0) {
                    clearInterval(interval)
                    return 0
                } else {
                    return prev - 1
                }
            })
        }, 1000);

        return () => clearInterval(interval)
    }, [seconds])
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0")
    const second = Math.floor(seconds % 60).toString().padStart(2, "0")

    //a usestate to store and render mcqs which is fetched from api
    const [mcqs, setMcqs] = useState([])

    //fetching data
    useEffect(() => {
        async function getMcqs() {
            const response = await axios.get(`http://localhost:3000/mcqs/${testId}`)
            setMcqs(response.data)
            // console.log(response.data);
        }
        getMcqs()
    }, [testId])

    //sending data correc_Count, totalMcq_Count, percentage
    async function sendData(data) {
        const res = await axios.post(`http://localhost:3000/result/${testId}`, data, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
        console.log(res);

    }

    //to handlecahnge
    //a useRef and function to store the selected choice
    const answer = useRef({})
    function handleChange(index, value) {
        answer.current = { ...answer.current, [index]: value }
        // console.log(answer);
    }

    //to handle submit
    //a function to check is the selected answer is coorect and after that to send data
    function handleSubmit() {
        let marks = 0
        let total = mcqs.length
        mcqs.forEach((e, index) => {
            if (answer.current[index] === e.correctOp) marks++
        })
        const perc = parseFloat(((marks / total) * 100).toFixed(2))
        let result = { totalQues: total, correctAsn: marks, percentage: perc }
        // console.log(result);
        localStorage.removeItem("endTime")
        sendData(result)
        navigate(-1)
    }

    return (
        <>
            <div className="flex justify-center sticky top-4">
                <div className="flex items-center gap-4 shadow-sm rounded-sm px-7 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="#2E5E99">
                        <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Z" />
                    </svg>
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-medium text-[#0D2440] tabular-nums w-12 text-center">{minutes}</span>
                            <span className="text-[10px] text-[#7BA4D0] tracking-widest uppercase">min</span>
                        </div>
                        <span className="text-2xl font-medium text-[#2E5E99] pb-3">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-medium text-[#0D2440] tabular-nums w-12 text-center">{second}</span>
                            <span className="text-[10px] text-[#7BA4D0] tracking-widest uppercase">sec</span>
                        </div>
                    </div>
                    <div className="w-px h-9 bg-[#7BA4D0] opacity-50"></div>
                    <span className=" text-[#2E5E99] tracking-wide">Remaining</span>
                </div>
            </div>

            <div className='flex flex-col'>
                {mcqs.map((e, index) => {
                    return <div key={index} className='flex flex-col gap-1.5 w-[95%] mx-auto my-3  rounded-md shadow-lg p-4 mb-6 md:rounded-sm lg:w-[60%] lg:mx-auto '>
                        <p className='font-semibold py-2 text-[#0D2440]'>{index + 1}. {e.ques}</p>

                        <label htmlFor={index + 'op1'} className='text-[#0D2440]'>
                            <input type="radio" id={index + 'op1'} name={'q' + index} value={e.op1} onChange={(e) => { handleChange(index, e.target.value) }} />
                            {' ' + e.op1}
                        </label>

                        <label htmlFor={index + 'op2'} className='text-[#0D2440]'>
                            <input type="radio" id={index + 'op2'} name={'q' + index} value={e.op2} onChange={(e) => { handleChange(index, e.target.value) }} />
                            {' ' + e.op2}
                        </label>

                        <label htmlFor={index + 'op3'} className='text-[#0D2440]'>
                            <input type="radio" id={index + 'op3'} name={'q' + index} value={e.op3} onChange={(e) => { handleChange(index, e.target.value) }} />
                            {' ' + e.op3}
                        </label>

                        <label htmlFor={index + 'op4'} className='text-[#0D2440]'>
                            <input type="radio" id={index + 'op4'} name={'q' + index} value={e.op4} onChange={(e) => { handleChange(index, e.target.value) }} />
                            {' ' + e.op4}
                        </label>

                    </div>
                })}


                <button onClick={() => { handleSubmit() }} className='self-center w-40 mb-2  py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none '>Submit</button>

            </div>
        </>
    )
}

export default McqTest
