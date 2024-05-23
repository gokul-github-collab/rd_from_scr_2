import React, { useEffect, useState } from 'react'
import api from '../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const DeleteCourseOutcome = ({ coId }) => {

    const navigate = useNavigate()
    useEffect(() => {
        getCo(coId)
    }, [coId])

    console.log(coId)
    const [co, setCo] = useState(null)

    const getCo = (id) => {
        api.get(`/api/course-outcome/${id}/`).
            then((res) => {
                setCo(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${co ? co.title : ""}`)) {
            try {
                await api.delete(`/api/course-outcome/delete/${co ? co.id : ""}/`)
                toast.error('Course Outcome deleted successfully')
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                navigate(`/subject/${co ? co.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteCourseOutcome