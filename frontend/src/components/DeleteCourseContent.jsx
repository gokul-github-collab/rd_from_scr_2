import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteCourseContent = ({ ccId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(ccId)
    }, [ccId])

    console.log(ccId)
    const [cc, setCc] = useState(null)

    const getCo = (id) => {
        api.get(`/api/course-content/${id}/`).
            then((res) => {
                setCc(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${cc ? cc.title : ''}`)) {
            try {
                await api.delete(`/api/course-content/delete/${cc ? cc.id : ''}/`);
                toast.error('Course Content deleted successfully');
                setTimeout(() => {
                    window.location.reload(); // Reload the page after 1.5 seconds
                }, 1500);
            } catch (err) {
                alert(err);
            }
        }
    };
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteCourseContent