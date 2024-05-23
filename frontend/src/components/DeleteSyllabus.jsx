import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteSyllabus = ({ sylId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(sylId)
    }, [sylId])

    const [syl, setSyl] = useState(null)

    const getCo = (id) => {
        api.get(`/api/syllabus/${id}/`).
            then((res) => {
                setSyl(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${syl ? syl.year : ""}`)) {
            try {
                await api.delete(`/api/syllabus/delete/${syl ? syl.id : ""}/`)
                toast.error('Syllabus deleted susylessfully')
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                navigate(`/courses/${syl ? syl.course : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="text-red-500" onClick={handleDeleteCourseOutcome} >- Delete</button>
    )
}

export default DeleteSyllabus