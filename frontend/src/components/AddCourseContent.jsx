import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import NotFound from '../pages/NotFound';

const AddCourseContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneSubject, setOneSubject] = useState(null);
  const [isSuperUser, setIsSuperuser] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hrs_pw, setHrsPw] = useState('');

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
    const createCourseContent = {
      title,
      description,
      hrs_pw,
      subject: oneSubject ? oneSubject.id : ""
    };

    try {
      await api.post(`/api/course-content/`, createCourseContent);
      toast.success('Course Content created successfully');
      navigate(`/subject/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSaveAndAnother = async (e) => {
    e.preventDefault();
    const createTextBook = {
      title,
      description,
      hrs_pw,
      subject: oneSubject ? oneSubject.id : ""
    };

    try {
      await api.post(`/api/course-content/`, createTextBook);
      toast.success('Course Content created successfully');
      // Clear form fields
      setTitle('');
      setDescription('');
      setHrsPw('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {isSuperUser ? (
        <div className="isolate bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Add Course Content</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Aute magna irure deserunt veniam aliqua magna enim voluptate.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                  CC Title
                </label>
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
                <label htmlFor="hrs_pw" className="block text-sm font-semibold leading-6 text-gray-900">
                  hrs_pw:
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="hrs_pw"
                    id="hrs_pw"
                    value={hrs_pw}
                    onChange={(e) => setHrsPw(e.target.value)}
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

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                  Description
                </label>
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
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default AddCourseContent;
