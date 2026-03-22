import { useEffect, useState } from 'react'
import axios from 'axios'
import UtestIntro from '../components/UtestIntro'

const UdashBoard = () => {

  const [data, setdata] = useState([])
  useEffect(() => {
    async function fetchData() {
      const cookies = await cookieStore.get("token")
      const res = (await axios.get('http://localhost:3000/test', { headers: { Authorization: `Bearer ${cookies.value}` } })).data
      setdata(res)
    }
    fetchData()
  }, [])

  return (
    <>
      {data.reverse().map((e, index) => {
        return <UtestIntro
          key={index}
          id={e.id}
          title={e.title}
          time={e.time}
          description={e.descrip} />
      })}
    </>
  )
}

export default UdashBoard