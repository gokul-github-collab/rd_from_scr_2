import React, { useEffect, useState } from 'react'
import api from '../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const DeleteCourseObjective = ({ cobId }) => {

    const navigate = useNavigate()
    useEffect(() => {
        getCo(cobId)
    }, [cobId])

    console.log(cobId)
    const [cob, setCob] = useState(null)

    const getCo = (id) => {
        api.get(`/api/course-objective/${id}/`).
            then((res) => {
                setCob(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseObjective = async () => {
        if (window.confirm(`Are you sure you want to delete ${cob ? cob.title : ""}`)) {
            try {
                await api.delete(`/api/course-objective/delete/${cob ? cob.id : ""}/`)
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                toast.error('Course Objective deleted successfully')
                navigate(`/subject/${cob ? cob.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseObjective} >Delete</button>
    )
}

export default DeleteCourseObjective