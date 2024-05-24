import React from 'react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import NotFound from '../pages/NotFound';
import ForbiddenPage from '../pages/ForbiddenPage';

const AddOnlineReference = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [oneSubject, setOneSubject] = useState(null);
    const [isSuperUser, setIsSuperuser] = useState(false);
    const [url, setUrl] = useState('');
    const [subject, setSubject] = useState(oneSubject ? oneSubject.id : "");

    useEffect(() => {
        if (id) {
            getSubject(id);
            checkSuperuser();
        }
    }, [id]);

    const checkSuperuser = async () => {
        try {
            const res = await api.get("/api/check_superuser/");
            console.log("Response from check_superuser:", res);
            setIsSuperuser(res.data.is_superuser);
        } catch (err) {
            console.error("Error checking superuser:", err);
        }
    };

    const getSubject = async (subjectId) => {
        try {
            const res = await api.get(`/api/subject/${subjectId}/`);
            const subjectData = res.data;
            setOneSubject(subjectData);
            console.log(subjectData.id);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createTextBook = {
            url,
            subject: oneSubject ? oneSubject.id : ""
        };

        try {
            await api.post(`/api/online-reference/`, createTextBook);
            toast.success('Online Reference created successfully');
            navigate(`/subject/${id}`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSaveAndAnother = async (e) => {
        e.preventDefault();
        const createTextBook = {
            url,
            subject: oneSubject ? oneSubject.id : ""
        };

        try {
            await api.post(`/api/online-reference/`, createTextBook);
            toast.success('Online Reference created successfully');
            // Clear form fields
            setUrl('');
            // Optionally, you can reset the subject as well
            // setSubject('');
            // You may also refetch the subject if needed
            // getSubject(id);
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!isSuperUser) {
        return <ForbiddenPage />;
    }

    return (
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-gray-100">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Add Online Reference</h2>
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
                                value={oneSubject ? oneSubject.name : ""}
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
                <div className="mt-10">
                    <button
                        type="button" onClick={handleSaveAndAnother}
                        className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                        Save and Another
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddOnlineReference;
