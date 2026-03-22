import React from 'react'

const UserResult = ({ testname, totalQues, correctAns, perc }) => {
    return (
        <>
            <section className="grid grid-cols-[1.5fr_1fr_1fr_1fr] p-2 border-b border-gray-200 mx-5">
                <p className="p-2">{testname}</p>
                <p className="p-2 border-l border-gray-300">{totalQues}</p>
                <p className="p-2 border-l border-gray-300">{correctAns}</p>
                <p className="p-2 border-l border-gray-300">{perc}%</p>
            </section>
        </>
    )
}

export default UserResult