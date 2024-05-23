import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const DeleteSemester = ({ semId }) => {
  const [semester, setSemester] = useState(null)
  const [subjects, setSubjects] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getSemester(semId)
  }, [semId])

  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`)
      .then((res) => {
        console.log(res.data); // Log the entire response data
        setSemester(res.data);
      })
      .catch((err) => toast.error(err));
  }


  const handleDeleteSemester = async () => {
    if (window.confirm(`Are you sure you want to delete ${semester ? semester.title : ""}`)) {
      try {
        await api.delete(`/api/semester/delete/${semester.id}/`)
        toast.error('Semester deleted successfully')
        setTimeout(()=>{
          window.location.reload()
      }, 1500)
        navigate(`/syllabus/${semester ? semester.syllabus : ""}`);
      } catch (err) {
        alert(err)
      }

    }
  }
  return (
    <button onClick={handleDeleteSemester}
      className="inline-block bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md">
      Delete Semester
    </button>
  )
}

export default DeleteSemester