import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api'

const DeleteReferenceBook = (rbId) => {


    const navigate = useNavigate()

    useEffect(() => {
        getCo(rbId.rbId)
    }, [rbId])

    console.log(rbId.rbId)
    const [rb, setRb] = useState(null)

    const getCo = (id) => {
        api.get(`/api/reference-book/${id}/`).
            then((res) => {
                setRb(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${rb ? rb.name : ""}`)) {
            try {
                await api.delete(`/api/reference-book/delete/${rb ? rb.id : ""}/`)
                toast.error('Reference Book deleted surbessfully')
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                navigate(`/subject/${rb ? rb.subject : ""}`);
            } catch (err) {
                alert(err)
            }
        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteReferenceBook