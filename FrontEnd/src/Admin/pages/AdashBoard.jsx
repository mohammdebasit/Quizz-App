import React, { useState, useEffect } from 'react'
import TestIntro from '../components/TestIntro'
import axios from 'axios'
import Cookies from 'js-cookie'
import BASE_URL from '../../config'

const AdashBoard = () => {

  const [data, setdata] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = (await axios.get(`${BASE_URL}/test`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
      )).data
      console.log(res);

      setdata(res)
    }
    fetchData()
  }, [])

  return (
    <>
      {[...data].reverse().map((e, index) => {
        return <TestIntro
          key={index}
          id={e.id}
          title={e.title}
          time={e.time}
          description={e.descrip} />
      })}
    </>
  )
}

export default AdashBoard
