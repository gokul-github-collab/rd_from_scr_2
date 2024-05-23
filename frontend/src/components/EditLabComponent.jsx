import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import NotFound from '../pages/NotFound'

const EditLabComponent = () => {


    const navigate = useNavigate()

    const { id } = useParams()

    const [isSuperUser, setIsSuperuser] = useState(false)

    const [lie, setLie] = useState('')
    const [co_mapping, setCo_mapping] = useState("")
    const [rbt, setRbt] = useState('')
    const [subject, setSubject] = useState("")
    const [co, setCo] = useState(null)

    useEffect(() => {
        getCo(id)
        checkSuperuser()
    }, [id])

    const checkSuperuser = () => {
        api.get("/api/check_superuser/")
            .then((res) => {
                console.log("Response from check_superuser:", res);
                setIsSuperuser(res.data.is_superuser);
            })
            .catch((err) => {
                console.error("Error checking superuser:", err);
            });
    };



    const getCo = (id) => {
        api.get(`/api/lab-component/${id}/`).
            then((res) => {

                setCo(res.data)

      
                setLie(res.data.lie)
                setCo_mapping(res.data.co_mapping)
                setRbt(res.data.rbt)
                setSubject(res.data.subject)


            }).
            catch((err) => toast.error(err))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const editLabComponent = {
 
            lie,
            co_mapping,
            rbt,
            subject

        };

        api.put(`/api/lab-component/${id}/`, editLabComponent)
            .then((res) => {
                toast('Lab Component updated successfully');
                navigate(`/subject/${co.subject}`);
            })
            .catch((err) => toast.error(err));
    };



    return (
        <>



            {isSuperUser ? <div className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-gray-100">

                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Edit Lab Component</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Aute magna irure deserunt veniam aliqua magna enim voluptate.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">



                        <div className="sm:col-span-2">
                            <label htmlFor="lie" className="block text-sm font-semibold leading-6 text-gray-900">
                                List of Component
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="lie"
                                    id="lie"
                                    value={lie}
                                    onChange={(e) => setLie(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="rbt" className="block text-sm font-semibold leading-6 text-gray-900">
                                List of Component
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="rbt"
                                    id="rbt"
                                    value={rbt}
                                    onChange={(e) => setRbt(e.target.value)}
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
                                    className="block w-full cursor-not-allowed pointer-events-none  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </div> : <NotFound />}




        </>
    )
}

export default EditLabComponent