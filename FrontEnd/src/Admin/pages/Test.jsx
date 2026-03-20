import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'

const Test = () => {

  const { testId } = useParams()
  //storing mcqs through api
  const [mcqs, setMcqs] = useState([])

  // //use to store the selected values
  // const [answer, setAnswer] = useState({})
  // function handleChange(index, value) {
  //   setAnswer({ ...answer, [index]: value })
  //   console.log(answer);

  // }

  // const [score, setScore] = useState(0)
  // function handleSubmit() {
  //   let total = 0
  //   mcqs.foreach((e, index) => {
  //     if (answer[index] === q.correctAns) {
  //       total++
  //     }
  //   })
  //   setScore(total)
  // }

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
        return <div key={index} className='flex flex-col gap-1.5 w-[95%] mx-auto my-3  rounded-md shadow-lg/15 p-3 mb-6 md:rounded-none lg:w-[60%] lg:mx-auto '>
          <p className='font-semibold py-2'>{index + 1}. {e.ques}</p>

          <label htmlFor={index + 'op1'} >
            <input type="radio" id={index + 'op1'} name={'q' + index} value={e.op1} />
            {' ' + e.op1}
          </label>

          <label htmlFor={index + 'op2'}>
            <input type="radio" id={index + 'op2'} name={'q' + index} value={e.op2} />
            {' ' + e.op2}
          </label>

          <label htmlFor={index + 'op3'}>
            <input type="radio" id={index + 'op3'} name={'q' + index} value={e.op3} />
            {' ' + e.op3}
          </label>

          <label htmlFor={index + 'op4'}>
            <input type="radio" id={index + 'op4'} name={'q' + index} value={e.op4} />
            {' ' + e.op4}
          </label>

        </div>
      })}
    </>
  )
}

export default Test