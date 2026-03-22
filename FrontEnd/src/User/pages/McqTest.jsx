import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Cookies from 'js-cookie'

const McqTest = () => {
    const { testId } = useParams()
    const navigate  = useNavigate()
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
       const res =  await axios.post(`http://localhost:3000/result/${testId}`, data, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
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
        console.log(result);
        sendData(result)
        navigate(-1)
    }

    return (
        <div className='flex flex-col'>
            {mcqs.map((e, index) => {
                return <div key={index} className='flex flex-col gap-1.5 w-[95%] mx-auto my-3  rounded-md shadow-lg/15 p-3 mb-6 md:rounded-none lg:w-[60%] lg:mx-auto '>
                    <p className='font-semibold py-2'>{index + 1}. {e.ques}</p>

                    <label htmlFor={index + 'op1'} >
                        <input type="radio" id={index + 'op1'} name={'q' + index} value={e.op1} onChange={(e) => { handleChange(index, e.target.value) }} />
                        {' ' + e.op1}
                    </label>

                    <label htmlFor={index + 'op2'}>
                        <input type="radio" id={index + 'op2'} name={'q' + index} value={e.op2} onChange={(e) => { handleChange(index, e.target.value) }} />
                        {' ' + e.op2}
                    </label>

                    <label htmlFor={index + 'op3'}>
                        <input type="radio" id={index + 'op3'} name={'q' + index} value={e.op3} onChange={(e) => { handleChange(index, e.target.value) }} />
                        {' ' + e.op3}
                    </label>

                    <label htmlFor={index + 'op4'}>
                        <input type="radio" id={index + 'op4'} name={'q' + index} value={e.op4} onChange={(e) => { handleChange(index, e.target.value) }} />
                        {' ' + e.op4}
                    </label>

                </div>
            })}


            <button onClick={() => { handleSubmit() }} className='self-center w-40  py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none '>Submit</button>

        </div>
    )
}

export default McqTest
