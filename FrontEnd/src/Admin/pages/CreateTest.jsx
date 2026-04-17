import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import BASE_URL from '../../config';

const CreateTest = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    send(data)
    console.log(data);
    
    reset()
  };

  async function send(params) {
    const res = await axios.post(`${BASE_URL}/test`, params ,{headers :{Authorization:`Bearer ${Cookies.get("token")}`}})
  }
  return (
    <div className='min-h-screen w-full flex flex-col mt-10 p-2 md:p-0'>

      <section className='w-full md:w-[70vw] md:m-auto md:mt-[8vh] md:p-10 md:border md:border-gray-200 md:shadow-lg/15'>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1 md:gap-5'>

          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id='title'
              placeholder="title"
              {...register("title", { required: true })}
              className='p-1.5 md:h-12 md:p-2 border border-gray-200 md:rounded-sm'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="time">Time</label>
            <input
              type="number"
              id='time'
              placeholder="Time Per Question"
              {...register("time", { required: true })}
              className='p-1.5 md:h-12 md:p-2 border border-gray-200 md:rounded-sm'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="description">Description</label>
            <textarea
              id='description'
              rows={5}
              {...register("Description", { required: true })}
              className='resize-none p-1.5 md:p-2 border border-gray-200 md:rounded-sm'
            />
          </div>

          <input
            type="submit"
            className='self-end flex-1 py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none md:w-48'
          />

        </form>
      </section>
    </div>)
}

export default CreateTest