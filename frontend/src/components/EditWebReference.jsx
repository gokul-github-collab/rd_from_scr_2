import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import NotFound from '../pages/NotFound'

const EditWebReference = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isSuperUser, setIsSuperuser] = useState(false)
    const [url, setUrl] = useState('')
    const [subject, setSubject] = useState("")
    const [wr, setWr] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            await getCo(id)
            await checkSuperuser()
        }
        fetchData()
    }, [id])

    const checkSuperuser = async () => {
        try {
            const res = await api.get("/api/check_superuser/")
            console.log("Response from check_superuser:", res)
            setIsSuperuser(res.data.is_superuser)
        } catch (err) {
            console.error("Error checking superuser:", err)
        }
    }

    const getCo = async (id) => {
        try {
            const res = await api.get(`/api/web-reference/${id}/`)
            setWr(res.data)
            setUrl(res.data.url)
            setSubject(res.data.subject)
        } catch (err) {
            toast.error(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editWebReference = { url, subject }

        try {
            await api.put(`/api/web-reference/${id}/`, editWebReference)
            toast('Web Reference updated successfully')
            navigate(`/subject/${wr.subject}`)
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <>
            {isSuperUser ? (
                <div className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-gray-100">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Edit Web Reference</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Aute magna irure deserunt veniam aliqua magna enim voluptate.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="url" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Website URL
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="url"
                                        id="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Subject Name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={subject}
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

export default EditWebReference
