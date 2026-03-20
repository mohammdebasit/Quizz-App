import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

const McqTest = () => {
    const { testId } = useParams()

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


    //to handlecahnge
    //a useRef and function to store the selected choice
    const answer = useRef({})
    function handleChange(index, value) {
        answer.current = { ...answer.current, [index]: value }
        // console.log(answer);
    }

    //to handle submit
    //a usestate and function to check is the selected answer is coorect
    const [score, setScore] = useState(0)
    function handleSubmit() {
        let marks = 0
        mcqs.forEach((e, index) => {
            if (Number(answer.current[index]) == Number(e.correctOp)) marks++
        })
        setScore(marks)
        console.log(marks);
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


            <button onClick={() => handleSubmit()} className='self-center w-40  py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none '>Submit</button>

        </div>
    )
}

export default McqTest


// admin token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFzaXQiLCJlbWFpbCI6ImJhc2l0MTIzQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNTcwMzIyfQ.37De3TZ6zNzg84v-u9Y44PCMfk8jqcdBvyapwHoWf1A