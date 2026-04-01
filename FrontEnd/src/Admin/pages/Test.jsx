import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'

const Test = () => {

  const { testId } = useParams()
  //storing mcqs through api
  const [mcqs, setMcqs] = useState([])

  useEffect(() => {
    async function getMcq() {
      const res = await axios.get(`http://localhost:3000/mcqs/${testId}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
      console.log(res.data);

      setMcqs(res.data)
    }
    getMcq()
  }, [testId])
  return (
    <>
      {mcqs.map((e, index) => {
        return <div key={index} className='flex flex-col gap-1.5 w-[95%] mx-auto my-3  rounded-md shadow-lg/15 p-4 mb-6 md:rounded-sm lg:w-[60%] lg:mx-auto '>
          <p className='font-semibold py-2 text-[#0D2440]'>{index + 1}. {e.ques}</p>

          <label htmlFor={index + 'op1'}  className='text-[#0D2440]'>
            <input type="radio" id={index + 'op1'} name={'q' + index} value={e.op1} />
            {' ' + e.op1}
          </label>

          <label htmlFor={index + 'op2'} className='text-[#0D2440]'>
            <input type="radio" id={index + 'op2'} name={'q' + index} value={e.op2} />
            {' ' + e.op2}
          </label>

          <label htmlFor={index + 'op3'} className='text-[#0D2440]'>
            <input type="radio" id={index + 'op3'} name={'q' + index} value={e.op3} />
            {' ' + e.op3}
          </label>

          <label htmlFor={index + 'op4'} className='text-[#0D2440]'>
            <input type="radio" id={index + 'op4'} name={'q' + index} value={e.op4} />
            {' ' + e.op4}
          </label>

        </div>
      })}
    </>
  )
}

export default Test