import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteLabComponent = ({ labId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(labId)
    }, [labId])

    const [lab, setLab] = useState(null)
    console.log(labId)

    const getCo = (id) => {
        api.get(`/api/lab-component/${id}/`).
            then((res) => {
                setLab(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${lab ? lab.lie : ""}`)) {
            try {
                await api.delete(`/api/lab-component/delete/${lab ? lab.id : ""}/`)
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                toast.error('Lab Component deleted successfully')
                navigate(`/subject/${lab ? lab.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteLabComponent