import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
const DeletePo = ({ id }) => {

    const navigate = useNavigate()

    const [po, setPo] = useState(null)

    useEffect(() => {
        getCourse(id)
    }, [id])

    const getCourse = (id) => {
        api.get(`/api/pos/${id}/`).
            then((res) => setPo(res.data)).
            catch((err) => toast.error(err))
    }



    const deletePo = async () => {

        if (window.confirm(`Are you sure want to delete ${po ? po.title : ""}`)) {
            try {
                await api.delete(`/api/pos/delete/${id}/`);
                toast.error("Program Outcome Deleted successfully");

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                navigate(`/courses/${po ? po.course : ""}/`);
            } catch (err) {
                toast.error(err)
            }

        }

    }
    return (
        <>


            <button onClick={deletePo}
                className="inline-block ml-1 mt-1 bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md">
                Delete PO
            </button>

        </>
    )
}

export default DeletePo