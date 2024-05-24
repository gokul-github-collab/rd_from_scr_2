import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api'
import NotFound from '../pages/NotFound'

const PsoForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isSuperUser, setIsSuperuser] = useState(false)
    const [onecourse, setOneCourse] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        if (id) {
            await getCourse(id)
            await checkSuperuser()
        }
    }

    const checkSuperuser = async () => {
        try {
            const res = await api.get("/api/check_superuser/")
            setIsSuperuser(res.data.is_superuser)
        } catch (err) {
            console.error("Error checking superuser:", err)
        }
    }

    const getCourse = async (courseId) => {
        try {
            const res = await api.get(`/api/courses/${courseId}/`)
            const courseData = res.data
            setOneCourse(courseData)
        } catch (err) {
            console.error("Error getting course:", err)
            toast.error(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createPo = {
            title,
            description,
            course: onecourse ? onecourse.id : null
        }

        try {
            const res = await api.post(`/api/psos/`, createPo)
            toast.success('PSO created successfully')
            navigate(`/courses/${id}`)
        } catch (err) {
            console.error("Error creating PSO:", err)
            toast.error(err.message)
        }
    }

    return (
        <>
            {isSuperUser ? (
                <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Add Program Specific Outcomes (PSO's)</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">PSO Title</label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Course Name</label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={onecourse ? onecourse.name : ""}
                                        readOnly
                                        className="block w-full cursor-not-allowed pointer-events-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default PsoForm
