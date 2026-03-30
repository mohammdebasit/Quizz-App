import React, { useEffect, useState } from 'react'
import UserResult from '../components/UserResult'
import axios from 'axios'
import Cookies from 'js-cookie'

const UViewResult = () => {
  const [result, setResult] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/result", { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
      console.log(res.data);
      setResult(res.data)
    }
    fetchData()
  }, [])
  return (
    <>
      <section className="grid grid-cols-[1.5fr_1fr_1fr_1fr] p-2 bg-gray-50 font-semibold mx-5">
        <p className="p-2">Test Name</p>
        <p className="p-2 border-l border-gray-300">Total Questions</p>
        <p className="p-2 border-l border-gray-300">Correct Answered</p>
        <p className="p-2 border-l border-gray-300">Percentage</p>
      </section>
      {[...result].reverse().map((e, index) => {
        return <UserResult
          key={index}
          testname={e.testIntro.title}
          totalQues={e.totalQues}
          correctAns={e.correctAsn}
          perc={e.percentage} />
      })}

    </>
  )
}

export default UViewResult