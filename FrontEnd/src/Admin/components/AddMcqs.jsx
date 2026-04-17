import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import Cookies from 'js-cookie';
import BASE_URL from '../../config';

const AddMcqs = () => {
    const { testId } = useParams()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const newData = { ...data, testId: testId }
        await axios.post(`${BASE_URL}/${testId}`, newData, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })
        reset()
        console.log(newData);
    }

    const navigate = useNavigate()
    return (
        <section className='p-2 md:w-[70vw] m-auto mt-[8vh] md:p-10 border border-gray-200 md:shadow-lg/15'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 '>
                <input type="text" placeholder="Enter a question" {...register("question", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />
                <input type="text" placeholder="choice 1" {...register("choice1", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />
                <input type="text" placeholder="choice 2" {...register("choice2", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />
                <input type="text" placeholder="choice 3" {...register("choice3", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />
                <input type="text" placeholder="choice 4" {...register("choice4", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />
                <input type="text" placeholder="Enter correct Answer" {...register("correctAns", { required: true })} className='h-12 border border-gray-200 rounded-sm p-2' />

                <div className="flex gap-3 justify-end">
                    <button onClick={() => navigate(-1)}
                        type="button" className='flex-1 py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none md:w-48'>Back </button>
                    <input type="submit"
                        className='flex-1 py-2.5 border border-[#2E5E99] text-[#2E5E99] hover:bg-[#2E5E99] hover:text-white rounded-md transition duration-200 md:flex-none md:w-48' />
                </div>
            </form>
        </section>
    )
}

export default AddMcqs