import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteWebReference = ({ wrId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(wrId)
    }, [wrId])

    const [wr, setWr] = useState(null)
    console.log(wrId)

    const getCo = (id) => {
        api.get(`/api/web-reference/${id}/`).
            then((res) => {
                setWr(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${wr ? wr.url : ""}`)) {
            try {
                await api.delete(`/api/web-reference/delete/${wr ? wr.id : ""}/`)
                toast.error('Web Reference deleted successfully')
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                navigate(`/subject/${wr ? wr.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteWebReference