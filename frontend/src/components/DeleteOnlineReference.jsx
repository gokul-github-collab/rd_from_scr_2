import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const DeleteOnlineReference = ({ orefId }) => {
    const navigate = useNavigate()
    useEffect(() => {
        getCo(orefId)
    }, [orefId])

    const [oref, setOref] = useState(null)
    console.log(orefId)

    const getCo = (id) => {
        api.get(`/api/online-reference/${id}/`).
            then((res) => {
                setOref(res.data)
            }).catch((err) => toast.error(err))

    }


    const handleDeleteCourseOutcome = async () => {
        if (window.confirm(`Are you sure you want to delete ${oref ? oref.url : ""}`)) {
            try {
                await api.delete(`/api/online-reference/delete/${oref ? oref.id : ""}/`)
                toast.error('Online Reference deleted successfully')
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)
                navigate(`/subject/${oref ? oref.subject : ""}`);
            } catch (err) {
                alert(err)
            }

        }
    }
    return (
        <button className="inline bg-gradient-to-tr mt-2 from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md" onClick={handleDeleteCourseOutcome} >Delete</button>
    )
}

export default DeleteOnlineReference