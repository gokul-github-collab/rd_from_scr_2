import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import NotFound from '../pages/NotFound'
import ForbiddenPage from '../pages/ForbiddenPage'

const EditSyllabus = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isSuperUser, setIsSuperuser] = useState(false)
  const [semester, setSemester] = useState(null)
  const [year, setYear] = useState("")
  const [course, setCourse] = useState("")
  const [syllabus, setSyllabus] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await getSyllabus(id)
      await checkSuperuser()
    }
    fetchData()
  }, [id])

  const getSyllabus = async (id) => {
    try {
      const res = await api.get(`/api/syllabus/${id}/`)
      setSyllabus(res.data)
      setYear(res.data.year)
      setCourse(res.data.course)
    } catch (err) {
      toast.error(err)
    }
  }

  const checkSuperuser = async () => {
    try {
      const res = await api.get("/api/check_superuser/")
      console.log("Response from check_superuser:", res)
      setIsSuperuser(res.data.is_superuser)
    } catch (err) {
      console.error("Error checking superuser:", err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const editSyllabus = {
      year,
      course,
    }

    try {
      await api.put(`/api/syllabus/${id}/`, editSyllabus)
      toast('Syllabus updated successfully')
      navigate(`/courses/${syllabus ? syllabus.course : ""}`)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      {isSuperUser ? (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-gray-100">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Edit Syllabus</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Aute magna irure deserunt veniam aliqua magna enim voluptate.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="year" className="block text-sm font-semibold leading-6 text-gray-900">
                  Syllabus Year
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Course Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={course}
                    readOnly
                    className="block w-full cursor-not-allowed pointer-events-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}

export default EditSyllabus

